/*
File have been automatically created. To prevent the file from getting overwritten
set the Front Matter property ´keep´ to ´true´ syntax for the code snippet
---
keep: true
---
*/
//generator:  noma3
package surveyresponse

// noma2
import (
	"github.com/magicbutton/magic-messages/applogic"
	"github.com/magicbutton/magic-messages/database"
	"github.com/magicbutton/magic-messages/services/models/surveyresponsemodel"
)

func SurveyResponseUpdate(item surveyresponsemodel.SurveyResponse) (*surveyresponsemodel.SurveyResponse, error) {

	return applogic.Update[database.SurveyResponse, surveyresponsemodel.SurveyResponse](item.ID, item, applogic.MapSurveyResponseIncoming, applogic.MapSurveyResponseOutgoing)

}
