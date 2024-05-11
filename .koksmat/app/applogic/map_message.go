/* 
File have been automatically created. To prevent the file from getting overwritten
set the Front Matter property ´keep´ to ´true´ syntax for the code snippet
---
keep: false
---
*/
//GenerateMapModel v1.1
package applogic
import (
	//"encoding/json"
	//"time"
	"github.com/magicbutton/magic-messages/database"
	"github.com/magicbutton/magic-messages/services/models/messagemodel"
   
)


func MapMessageOutgoing(db database.Message) messagemodel.Message {
    return messagemodel.Message{
        ID:        db.ID,
        CreatedAt: db.CreatedAt,
        UpdatedAt: db.UpdatedAt,
                Tenant : db.Tenant,
        Name : db.Name,
        Description : db.Description,
        Unique_Message_Id : db.Unique_Message_Id,
        Subject : db.Subject,
        Body : db.Body,
        Sender : db.Sender,
        Receiver : db.Receiver,

    }
}

func MapMessageIncoming(in messagemodel.Message) database.Message {
    return database.Message{
        ID:        in.ID,
        CreatedAt: in.CreatedAt,
        UpdatedAt: in.UpdatedAt,
                Tenant : in.Tenant,
        Name : in.Name,
        Description : in.Description,
        Unique_Message_Id : in.Unique_Message_Id,
        Subject : in.Subject,
        Body : in.Body,
        Sender : in.Sender,
        Receiver : in.Receiver,

    }
}
