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
        "github.com/magicbutton/magic-messages/services/endpoints/person"
                    "github.com/magicbutton/magic-messages/services/models/personmodel"
        "github.com/stretchr/testify/assert"
    )
    
    func TestPersoncreate(t *testing.T) {
                                // transformer v1
            object := personmodel.Person{}
         
            result,err := person.PersonCreate(object)
            if err != nil {
                t.Errorf("Error %s", err)
            }
            assert.NotNil(t, result)
        
    
    }
    
