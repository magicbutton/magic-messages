/*
File have been automatically created. To prevent the file from getting overwritten
set the Front Matter property ´keep´ to ´true´ syntax for the code snippet
---
keep: true
---
*/
//generator:  noma3
package survey

// noma2
import (
	"log"

	"github.com/magicbutton/magic-messages/applogic"
	"github.com/magicbutton/magic-messages/database"
	"github.com/magicbutton/magic-messages/services/models/surveymodel"
)

func SurveyRead(id int) (*surveymodel.Survey, error) {
	log.Println("Calling SurveyRead")

	return applogic.Read[database.Survey, surveymodel.Survey](id, applogic.MapSurveyOutgoing)

}
