import Foundation
import Capacitor
import CouchbaseLiteSwift

struct ListenerMeta {
    let callbackId: String
    let databaseKey: Int
    let token: ListenerToken
}

@objc public class CouchbaseLite: NSObject {
    private var _nextDatabaseKey = 1
    private var _nextListenerTokenKey = 1
    
    private var databases: [Int: Database] = [:]
    private var listeners: [Int: ListenerMeta] = [:]
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
        let token = databases[databaseKey]!.addChangeListener { (change: DatabaseChange) in
            call.resolve([
                "databaseIDs": change.documentIDs
            ])
        }
        
        listeners[listenerTokenKey] = ListenerMeta(callbackId: call.callbackId, databaseKey: databaseKey, token: token)
        
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
        if (!commit) {
            transactions.removeValue(forKey: databaseKey)
            return
        }

        do {
            let transaction = transactions[databaseKey]

            transactions.removeValue(forKey: databaseKey)
            
            try databases[databaseKey]?.inBatch {
                transaction?.forEach { operation in
                    operation()
                }
            }
        } catch {
//            error!
        }
    }

    public func removeDatabaseChangeListener(listenerTokenKey: Int) -> String {
        let listenerMeta = listeners[listenerTokenKey]!
        
        listeners.removeValue(forKey: listenerTokenKey)
        databases[listenerMeta.databaseKey]!.removeChangeListener(withToken: listenerMeta.token)
        
        return listenerMeta.callbackId
    }

//    (Database) => Document
    public func getDocument(databaseKey: Int, id: String) -> Dictionary<String, Any>? {
        return databases[databaseKey]?.document(withID: id)?.toDictionary()
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
    }
}
