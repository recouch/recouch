import Foundation
import Capacitor
import CouchbaseLiteSwift

struct ListenerMeta {
    let callbackId: String
    let key: Int
    let token: ListenerToken
}

@objc public class CouchbaseLite: NSObject {
    private var _nextDatabaseKey = 1
    private var _nextListenerTokenKey = 1
    private var _nextQueryKey = 1
    private var _nextReplicatorKey = 1
    
    private var databases: [Int: Database] = [:]
    private var listeners: [Int: ListenerMeta] = [:]
    private var queries: [Int: Query] = [:]
    private var replicators: [Int: Replicator] = [:]
    private var transactions: [Int: [()->()]] = [:]
    
    func getNextDatabaseKey() -> Int {
        let nextKey = _nextDatabaseKey

        _nextDatabaseKey += 1
        
        return nextKey
    }

    func getNextListenerTokenKey() -> Int {
        let nextKey = _nextListenerTokenKey

        _nextListenerTokenKey += 1
        
        return nextKey
    }

    func getNextQueryKey() -> Int {
        let nextKey = _nextQueryKey

        _nextQueryKey += 1
        
        return nextKey
    }
    
    func getNextReplicatorKey() -> Int {
        let nextKey = _nextReplicatorKey

        _nextReplicatorKey += 1
        
        return nextKey
    }
    
//    () => Database
    public func openDatabase(name: String, directory: String?) -> Int {
        let databaseKey = getNextDatabaseKey()
        var config = DatabaseConfiguration()
        
        if (directory != nil) {
            config.directory = directory!
        }
        
        databases[databaseKey] = try!Database(name: name, config: config)
        
        return databaseKey
    }

//    (Database)
    public func addDatabaseChangeListener(databaseKey: Int, call: CAPPluginCall) -> Int {
        let listenerTokenKey = getNextListenerTokenKey()
        
        let token = databases[databaseKey]!.addChangeListener() { (change) in
            call.resolve([
                "docIDs": change.documentIDs
            ])
        }
        
        listeners[listenerTokenKey] = ListenerMeta(callbackId: call.callbackId, key: databaseKey, token: token)
        
        return listenerTokenKey
    }
    
    public func beginTransaction(databaseKey: Int) -> Void {
        transactions[databaseKey] = []
    }
    
    public func closeDatabase(databaseKey: Int) -> Void {
        try!databases[databaseKey]?.close()
        
        databases.removeValue(forKey: databaseKey)
    }
    
    public func deleteDatabase(databaseKey: Int) -> Void {
        try!databases[databaseKey]?.delete()
        
        databases.removeValue(forKey: databaseKey)
    }
    
    public func databaseName(databaseKey: Int) -> String {
        return databases[databaseKey]!.name
    }
    
    public func databasePath(databaseKey: Int) -> String? {
        return databases[databaseKey]?.path
    }
    
    public func endTransaction(databaseKey: Int, commit: Bool) -> Void {
        guard let transaction = transactions.removeValue(forKey: databaseKey) else {
            return
        }
        
        guard let database = databases[databaseKey] else {
            return
        }
        
        if (!commit) {
            return
        }
        
        if (transaction.isEmpty) {
            return
        }

        do {
            try database.inBatch {
                transaction.forEach { operation in
                    operation()
                }
            }
        } catch let error {
//            TODO: Rollback operations
            print(error.localizedDescription)
        }
    }

    public func removeDatabaseChangeListener(listenerTokenKey: Int) -> String {
        let listenerMeta = listeners[listenerTokenKey]!
        
        listeners.removeValue(forKey: listenerTokenKey)
        databases[listenerMeta.key]!.removeChangeListener(withToken: listenerMeta.token)
        
        return listenerMeta.callbackId
    }

//    (Database) => Document
    public func addDocumentChangeListener(databaseKey: Int, id: String, call: CAPPluginCall) -> Int {
        let listenerTokenKey = getNextListenerTokenKey()
        let token = databases[databaseKey]!.addDocumentChangeListener(withID: id) { (change) in
            call.resolve([
                "docID": change.documentID
            ])
        }
        
        listeners[listenerTokenKey] = ListenerMeta(callbackId: call.callbackId, key: databaseKey, token: token)
        
        return listenerTokenKey
    }
    
    public func getDocument(databaseKey: Int, id: String) -> Dictionary<String, Any>? {
        return databases[databaseKey]?.document(withID: id)?.toDictionary()
    }
    
    public func deleteDocument(databaseKey: Int, id: String) -> Void {
        guard let database = databases[databaseKey] else {
            return
        }

        guard let document = databases[databaseKey]?.document(withID: id) else {
            return
        }
        
        let operation: () -> Void = {
            do {
                try database.deleteDocument(document)
            } catch let error {
                print(error.localizedDescription)
            }
        }
        
        guard var transaction = transactions[databaseKey] else {
            operation()
            return
        }

        transaction.append(operation)
        transactions[databaseKey] = transaction
    }
    
    public func documentExists(databaseKey: Int, id: String) -> Bool {
        return databases[databaseKey]?.document(withID: id) != nil
    }

    public func saveDocument(databaseKey: Int, id: String, value: JSObject) {
        guard let database = databases[databaseKey] else {
            return
        }

        let operation: () -> Void = {
            let document = database.document(withID: id)?.toMutable() ?? MutableDocument(id: id)
            
            document.setData(value)

            try!database.saveDocument(document)
        }
        
        guard var transaction = transactions[databaseKey] else {
            operation()
            return
        }

        transaction.append(operation)
        transactions[databaseKey] = transaction
    }
    
//  Query
    public func createQuery(databaseKey: Int, query: String) -> Int {
        guard let database = databases[databaseKey] else {
            return 0
        }

        let queryKey = getNextQueryKey()

        queries[queryKey] = try!database.createQuery(query)

        return queryKey
    }
    
    public func addQueryChangeListener(queryKey: Int, call: CAPPluginCall) -> Int {
        let listenerTokenKey = getNextListenerTokenKey()
        let token = queries[queryKey]!.addChangeListener { (change: QueryChange) in
            guard let resultSet = change.results else {
                call.resolve()
                return
            }

            var results: [Dictionary<String, Any>] = []

            for row in resultSet {
                results.append(row.toDictionary())
            }
            
            call.resolve([
                "results": results
            ])
        }
        
        listeners[listenerTokenKey] = ListenerMeta(callbackId: call.callbackId, key: queryKey, token: token)
        
        return listenerTokenKey
    }
    
    public func removeQueryChangeListener(listenerTokenKey: Int) -> String {
        let listenerMeta = listeners[listenerTokenKey]!
        
        listeners.removeValue(forKey: listenerTokenKey)
        queries[listenerMeta.key]!.removeChangeListener(withToken: listenerMeta.token)
        
        return listenerMeta.callbackId
    }
    
    public func executeQuery(queryKey: Int) -> [Dictionary<String, Any>] {
        guard let query = queries[queryKey] else {
            return [[:]]
        }

        let resultSet = try!query.execute()
        var results: [Dictionary<String, Any>] = []

        for row in resultSet {
            results.append(row.toDictionary())
        }

        return results
    }

    public func setQueryParameters(queryKey: Int, parameters: Dictionary<String, Any>) -> Void {
        guard let query = queries[queryKey] else {
            return
        }
        
        for (name, value) in parameters {
            query.parameters?.setValue(value, forName: name)
        }
    }
    
//    Replicator
    public func createReplicator(config: JSObject) -> Int {
        guard let databaseKey = config["database"] as? Int else {
            return 0
        }

        guard let database = databases[databaseKey] else {
            return 0
        }
        
        guard let endpoint = config["endpoint"] as? String else {
            return 0
        }
        
        guard let targetURL = URL(string: endpoint) else {
            fatalError("Invalid URL")
        }
        
        let target = URLEndpoint(url: targetURL)
        let replicatorKey = getNextReplicatorKey()
        var replicatorConfig = ReplicatorConfiguration(database: database, target: target)
        let authentication = config["authenticator"] as? Dictionary<String, String>
        
        if (authentication?["type"] == "basic") {
            guard let username = authentication?["username"] else {
                return 0
            }
            guard let password = authentication?["password"] else {
                return 0
            }

            replicatorConfig.authenticator = BasicAuthenticator(username: username, password: password)
        } else
        if (authentication?["type"] == "session") {
            guard let sessionID = authentication?["sessionID"] else {
                return 0
            }
            let cookieName = authentication?["cookieName"]

            replicatorConfig.authenticator = SessionAuthenticator(sessionID: sessionID, cookieName: cookieName)
        }
        
        replicatorConfig.continuous = config["continuous"] as? Bool ?? false

        replicators[replicatorKey] = Replicator.init(config: replicatorConfig)
        
        return replicatorKey
    }
    
    public func startReplicator(replicatorKey: Int) -> Void {
        guard let replicator = replicators[replicatorKey] else {
            return
        }
        
        replicator.start()
    }
    
    public func stopReplicator(replicatorKey: Int) -> Void {
        guard let replicator = replicators[replicatorKey] else {
            return
        }
        
        replicator.stop()
    }
    
    public func addDocumentReplicationListener(replicatorKey: Int, call: CAPPluginCall) -> Int {
        let listenerTokenKey = getNextListenerTokenKey()
        guard let replicator = replicators[replicatorKey] else {
            return 0
        }
        
        let token = replicator.addDocumentReplicationListener { (replication: DocumentReplication) in
            call.resolve([
                "direction": replication.isPush ? "push" : "pull",
                "documents": replication.documents.map { [
                    "id": $0.id,
                    "error": $0.error?.localizedDescription as Any,
                    "accessRemoved": $0.flags.contains(.accessRemoved),
                    "deleted": $0.flags.contains(.deleted)
                ] }
            ])
        }
        
        listeners[listenerTokenKey] = ListenerMeta(callbackId: call.callbackId, key: replicatorKey, token: token)
        
        return listenerTokenKey
    }
    
    public func addReplicatorChangeListener(replicatorKey: Int, call: CAPPluginCall) -> Int {
        let listenerTokenKey = getNextListenerTokenKey()
        guard let replicator = replicators[replicatorKey] else {
            return 0
        }
        
        let token = replicator.addChangeListener { (change: ReplicatorChange) in
            let activity: String = {
                switch change.status.activity {
                case .stopped: return "stopped"
                case .offline: return "offline"
                case .connecting: return "connecting"
                case .idle: return "idle"
                case .busy: return "busy"
                default: return ""
                }
            }()
            
            call.resolve([
                "status": [
                    "activity": activity,
                    "error": change.status.error?.localizedDescription as Any,
                    "progress": [
                        "complete": change.status.progress.completed,
                        "documentCount": change.status.progress.total
                    ]
                ]
            ])
        }
        
        listeners[listenerTokenKey] = ListenerMeta(callbackId: call.callbackId, key: replicatorKey, token: token)
        
        return listenerTokenKey
    }
    
    public func removeReplicatorListener(listenerTokenKey: Int) -> String {
        let listenerMeta = listeners[listenerTokenKey]!
        
        listeners.removeValue(forKey: listenerTokenKey)
        replicators[listenerMeta.key]!.removeChangeListener(withToken: listenerMeta.token)
        
        return listenerMeta.callbackId
    }
    
//    Blob
    func blobProperties(contentType: String, data: Data) -> [String : Any] {
        let blob = Blob(contentType: contentType, data: data)

        return blob.properties
    }
    
    func databaseGetBlob(databaseKey: Int, properties: [String : Any]) -> Data? {
        guard let database = databases[databaseKey] else {
            return nil
        }

        let blob = try?database.getBlob(properties: properties)
        
        return blob?.content
    }
    
    func databaseSaveBlob(databaseKey: Int, contentType: String, data: Data) -> Void {
        guard let database = databases[databaseKey] else {
            return
        }
        let blob = Blob(contentType: contentType, data: data)

        try!database.saveBlob(blob: blob)
    }
    
    func documentGetBlob(databaseKey: Int, id: String, property: String) -> Data? {
        guard let database = databases[databaseKey] else {
            return nil
        }
        guard let document = database.document(withID: id) else {
            return nil
        }

        let blob = document.blob(forKey: property)
        
        return blob?.content
    }
    
    func documentGetBlobProperties(databaseKey: Int, id: String, property: String) -> [String : Any]? {
        guard let database = databases[databaseKey] else {
            return nil
        }
        guard let document = database.document(withID: id) else {
            return nil
        }

        let blob = document.blob(forKey: property)
        
        return blob?.properties
    }
    
    func documentIsBlob(databaseKey: Int, id: String, property: String) -> Bool {
        guard let database = databases[databaseKey] else {
            return false
        }
        guard let document = database.document(withID: id)?.toMutable() else {
            return false
        }

        let blob = document.blob(forKey: property)
        
        return blob != nil
    }

    func documentSaveBlob(databaseKey: Int, id: String, property: String, contentType: String, data: Data) -> Void {
        guard let database = databases[databaseKey] else {
            return
        }
        guard let document = database.document(withID: id)?.toMutable() else {
            return
        }
        let blob = Blob(contentType: contentType, data: data)

        document.setBlob(blob, forKey: property)
        
        try!database.saveDocument(document)
    }
}
