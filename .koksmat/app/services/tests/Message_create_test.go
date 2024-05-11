    /* 
File have been automatically created. To prevent the file from getting overwritten
set the Front Matter property ´keep´ to ´true´ syntax for the code snippet
---
keep: false
---
*/
    //generator:  noma4.1
    package tests
    import (
        "testing"
        "github.com/magicbutton/magic-messages/services/endpoints/message"
                    "github.com/magicbutton/magic-messages/services/models/messagemodel"
        "github.com/stretchr/testify/assert"
    )
    
    func TestMessagecreate(t *testing.T) {
                                // transformer v1
            object := messagemodel.Message{}
         
            result,err := message.MessageCreate(object)
            if err != nil {
                t.Errorf("Error %s", err)
            }
            assert.NotNil(t, result)
        
    
    }
    
