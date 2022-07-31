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
            "value": listenerTokenKey
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
        call.unimplemented()
    }

    @objc func deleteDocument(_ call: CAPPluginCall) {
        call.unimplemented()
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
        call.unimplemented()
    }

    @objc func addQueryChangeListener(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func executeQuery(_ call: CAPPluginCall) {
        call.unimplemented()
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
        call.unimplemented()
    }

    @objc func addReplicatorChangeListener(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func createReplicator(_ call: CAPPluginCall) {
        call.unimplemented()
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
        call.unimplemented()
    }

    @objc func stopReplicator(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func blobContent(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func blobContentType(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func blobCreateJson(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func blobProperties(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func createBlobWithData(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func createBlobWithStream(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func blobDigest(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func blobEquals(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func blobLength(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func openBlobContentStream(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func closeBlobReader(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func readBlobReader(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func closeBlobWriter(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func createBlobWriter(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func writeBlobWriter(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func databaseGetBlob(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func databaseSaveBlob(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func documentGetBlob(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func documentIsBlob(_ call: CAPPluginCall) {
        call.unimplemented()
    }

    @objc func documentSetBlob(_ call: CAPPluginCall) {
        call.unimplemented()
    }
}
