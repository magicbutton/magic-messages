/*
File have been automatically created. To prevent the file from getting overwritten
set the Front Matter property ´´keep´´ to ´´true´´ syntax for the code snippet
---
keep: false
---
*/
//generator:  noma3.search.v2
package message

import (
    "log"

    "github.com/magicbutton/magic-messages/applogic"
    "github.com/magicbutton/magic-messages/database"
    "github.com/magicbutton/magic-messages/services/models/messagemodel"
    . "github.com/magicbutton/magic-messages/utils"
)

func MessageSearch(query string) (*Page[messagemodel.Message], error) {
    log.Println("Calling Messagesearch")

    return applogic.Search[database.Message, messagemodel.Message]("name", query, applogic.MapMessageOutgoing)

}
