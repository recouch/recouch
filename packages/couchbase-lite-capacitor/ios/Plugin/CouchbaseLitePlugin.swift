import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CouchbaseLitePlugin)
public class CouchbaseLitePlugin: CAPPlugin {
    private let implementation = CouchbaseLite()

    @objc func openDatabase(_ call: CAPPluginCall) {
        guard let name = call.getString("name") else {
            call.reject("Must provide a database name")
            return
        }
        let directory = call.getString("directory")
        let databaseKey = implementation.openDatabase(name: name, directory: directory)
        
        call.resolve([
            "value": databaseKey
        ])
    }
    
    @objc func addDatabaseChangeListener(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        
        call.keepAlive = true
        
        let listenerTokenKey = implementation.addDatabaseChangeListener(databaseKey: databaseKey, call: call)

        call.resolve([
            "token": listenerTokenKey
        ])
    }
    
    @objc func beginTransaction(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        
        implementation.beginTransaction(databaseKey: databaseKey)
        
        call.resolve()
    }
    
    @objc func closeDatabase(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        
        implementation.closeDatabase(databaseKey: databaseKey)
        
        call.resolve()
    }
    
    @objc func deleteDatabase(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        
        implementation.deleteDatabase(databaseKey: databaseKey)
        
        call.resolve()
    }
    
    @objc func databaseName(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        
        call.resolve([
            "value": implementation.databaseName(databaseKey: databaseKey)
        ])
    }

    @objc func databasePath(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        
        call.resolve([
            "value": implementation.databasePath(databaseKey: databaseKey) ?? ""
        ])
    }
    
    @objc func endTransaction(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        
        guard let commit = call.getBool("commit") else {
            call.reject("Commit not specified specified")
            return
        }
        
        implementation.endTransaction(databaseKey: databaseKey, commit: commit)
        
        call.resolve()
    }
    
    @objc func removeDatabaseChangeListener(_ call: CAPPluginCall) {
        guard let listenerTokenKey = call.getInt("token") else {
            call.reject("No token specified")
            return
        }
        
        let callbackId = implementation.removeDatabaseChangeListener(listenerTokenKey: listenerTokenKey)
        bridge?.releaseCall(withID: callbackId)

        call.resolve()
    }

//    Document
    @objc func getDocument(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        guard let id = call.getString("id") else {
            call.reject("No ID specified")
            return
        }
        
        let value = implementation.getDocument(databaseKey: databaseKey, id: id)
        
        call.resolve(value != nil ? [
            "value": value!
        ]: [:])
    }
    
    @objc func addDocumentChangeListener(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        guard let id = call.getString("id") else {
            call.reject("No document ID specified")
            return
        }
        
        call.keepAlive = true
        
        let listenerTokenKey = implementation.addDocumentChangeListener(databaseKey: databaseKey, id: id, call: call)

        call.resolve([
            "token": listenerTokenKey
        ])
    }

    @objc func deleteDocument(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        
        guard let id = call.getString("id") else {
            call.reject("No document id specified")
            return
        }
        
        implementation.deleteDocument(databaseKey: databaseKey, id: id)
        
        call.resolve()
    }
    
    @objc func documentExists(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        
        guard let id = call.getString("id") else {
            call.reject("No document id specified")
            return
        }
        
        call.resolve([
            "value": implementation.documentExists(databaseKey: databaseKey, id: id)
        ])
    }

    @objc func saveDocument(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        
        guard let id = call.getString("id") else {
            call.reject("No document id specified")
            return
        }
        
        guard let value = call.getObject("value") else {
            call.reject("No document value specified")
            return
        }
        
        implementation.saveDocument(databaseKey: databaseKey, id: id, value: value)
        
        call.resolve()
    }

    @objc func createQuery(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        guard let query = call.getString("query") else {
            call.reject("No query string specified")
            return
        }
        
        let value = implementation.createQuery(databaseKey: databaseKey, query: query)
        
        call.resolve([
            "value": value
        ])
    }

    @objc func addQueryChangeListener(_ call: CAPPluginCall) {
        guard let queryKey = call.getInt("query") else {
            call.reject("No query specified")
            return
        }
        
        call.keepAlive = true
        
        let listenerTokenKey = implementation.addQueryChangeListener(queryKey: queryKey, call: call)

        call.resolve([
            "token": listenerTokenKey
        ])
    }
    
    @objc func removeQueryChangeListener(_ call: CAPPluginCall) {
        guard let listenerTokenKey = call.getInt("token") else {
            call.reject("No token specified")
            return
        }
        
        let callbackId = implementation.removeQueryChangeListener(listenerTokenKey: listenerTokenKey)
        bridge?.releaseCall(withID: callbackId)

        call.resolve()
    }

    @objc func executeQuery(_ call: CAPPluginCall) {
        guard let queryKey = call.getInt("query") else {
            call.reject("No query specified")
            return
        }
        
        call.resolve([
            "value": implementation.executeQuery(queryKey: queryKey)
        ])
    }

    @objc func explainQuery(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func getQueryParameters(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func setQueryParameters(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func addDocumentReplicationListener(_ call: CAPPluginCall) {
        guard let replicatorKey = call.getInt("replicator") else {
            call.reject("No query specified")
            return
        }
        
        call.keepAlive = true
        
        let listenerTokenKey = implementation.addDocumentReplicationListener(replicatorKey: replicatorKey, call: call)
        
        if (listenerTokenKey == 0) {
            call.reject("addDocumentReplicationListener failed")
            bridge?.releaseCall(call)
            return
        }

        call.resolve([
            "token": listenerTokenKey
        ])
    }

    @objc func addReplicatorChangeListener(_ call: CAPPluginCall) {
        guard let replicatorKey = call.getInt("replicator") else {
            call.reject("No query specified")
            return
        }
        
        call.keepAlive = true
        
        let listenerTokenKey = implementation.addReplicatorChangeListener(replicatorKey: replicatorKey, call: call)
        
        if (listenerTokenKey == 0) {
            call.reject("addReplicatorChangeListener failed")
            bridge?.releaseCall(call)
            return
        }

        call.resolve([
            "token": listenerTokenKey
        ])
    }
    
    @objc func removeReplicatorListener(_ call: CAPPluginCall) {
        guard let listenerTokenKey = call.getInt("token") else {
            call.reject("No token specified")
            return
        }
        
        let callbackId = implementation.removeReplicatorListener(listenerTokenKey: listenerTokenKey)
        bridge?.releaseCall(withID: callbackId)

        call.resolve()
    }

    @objc func createReplicator(_ call: CAPPluginCall) {
        guard let config = call.getObject("config") else {
            call.reject("No config specified")
            return
        }
        
        call.resolve([
            "value": implementation.createReplicator(config: config)
        ])
    }

    @objc func documentsPendingReplication(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func isDocumentPendingReplication(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func replicatorConfiguration(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func replicatorStatus(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func setHostReachable(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func startReplicator(_ call: CAPPluginCall) {
        guard let replicatorKey = call.getInt("replicator") else {
            call.reject("No replicator specified")
            return
        }
        
        implementation.startReplicator(replicatorKey: replicatorKey)
        
        call.resolve()
    }

    @objc func stopReplicator(_ call: CAPPluginCall) {
        guard let replicatorKey = call.getInt("replicator") else {
            call.reject("No replicator specified")
            return
        }
        
        implementation.stopReplicator(replicatorKey: replicatorKey)
        
        call.resolve()
    }

//    Blob
    @objc func blobProperties(_ call: CAPPluginCall) {
        guard let blob = call.getObject("blob") else {
            call.reject("Blob config not specified")
            return
        }
        guard let contentType = blob["contentType"] as? String else {
            call.reject("contentType config not specified")
            return
        }
        guard let dataString = blob["data"] as? String else {
            call.reject("contentType config not specified")
            return
        }
        guard let data = Data(base64Encoded: dataString) else {
            call.reject("Invalid data")
            return
        }
        
        call.resolve([
            "value": implementation.blobProperties(contentType: contentType, data: data)
        ])
    }
    
    @objc func databaseGetBlob(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        guard let properties = call.getObject("properties") else {
            call.reject("Blob properties not specified")
            return
        }
        guard let data = implementation.databaseGetBlob(databaseKey: databaseKey, properties: properties) else {
            call.reject("No blob with the given properties was found in the database")
            return
        }
        
        call.resolve([
            "value": data.base64EncodedString()
        ])
    }
    
    @objc func databaseSaveBlob(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        guard let blob = call.getObject("blob") else {
            call.reject("Blob config not specified")
            return
        }
        guard let contentType = blob["contentType"] as? String else {
            call.reject("contentType config not specified")
            return
        }
        guard let dataString = blob["data"] as? String else {
            call.reject("contentType config not specified")
            return
        }
        guard let data = Data(base64Encoded: dataString) else {
            call.reject("Invalid data")
            return
        }
        
        implementation.databaseSaveBlob(databaseKey: databaseKey, contentType: contentType, data: data)
        
        call.resolve()
    }
    
    @objc func documentGetBlob(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        guard let id = call.getString("id") else {
            call.reject("No document id specified")
            return
        }
        guard let property = call.getString("property") else {
            call.reject("No document property specified")
            return
        }
        guard let data = implementation.documentGetBlob(databaseKey: databaseKey, id: id, property: property) else {
            call.reject("No blob was found in the given document at the given property")
            return
        }
        
        call.resolve([
            "value": data.base64EncodedString()
        ])
    }
    
    @objc func documentGetBlobProperties(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        guard let id = call.getString("id") else {
            call.reject("No document id specified")
            return
        }
        guard let property = call.getString("property") else {
            call.reject("No document property specified")
            return
        }
        guard let properties = implementation.documentGetBlobProperties(databaseKey: databaseKey, id: id, property: property) else {
            call.resolve()
            return
        }
        
        call.resolve([
            "value": properties
        ])
    }
    
    @objc func documentIsBlob(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        guard let id = call.getString("id") else {
            call.reject("No document id specified")
            return
        }
        guard let property = call.getString("property") else {
            call.reject("No document property specified")
            return
        }
        
        call.resolve([
            "value": implementation.documentIsBlob(databaseKey: databaseKey, id: id, property: property)
        ])
    }
    
    @objc func documentSaveBlob(_ call: CAPPluginCall) {
        guard let databaseKey = call.getInt("database") else {
            call.reject("No database specified")
            return
        }
        guard let id = call.getString("id") else {
            call.reject("No document id specified")
            return
        }
        guard let property = call.getString("property") else {
            call.reject("No document property specified")
            return
        }
        guard let blob = call.getObject("blob") else {
            call.reject("Blob config not specified")
            return
        }
        guard let contentType = blob["contentType"] as? String else {
            call.reject("contentType config not specified")
            return
        }
        guard let dataString = blob["data"] as? String else {
            call.reject("contentType config not specified")
            return
        }
        guard let data = Data(base64Encoded: dataString) else {
            call.reject("Invalid data")
            return
        }
        
        implementation.documentSaveBlob(databaseKey: databaseKey, id: id, property: property, contentType: contentType, data: data)
        
        call.resolve()
    }
}
