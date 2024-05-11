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
        
        "github.com/stretchr/testify/assert"
    )
    
    func TestMessageread(t *testing.T) {
                    
            result,err := message.MessageRead(-1)
            if err != nil {
                t.Errorf("Error %s", err)
            }
            assert.NotNil(t, result)
        
    
    }
    
