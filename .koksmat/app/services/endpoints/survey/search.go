/*
File have been automatically created. To prevent the file from getting overwritten
set the Front Matter property ´´keep´´ to ´´true´´ syntax for the code snippet
---
keep: false
---
*/
//generator:  noma3.search.v2
package survey

import (
    "log"

    "github.com/magicbutton/magic-messages/applogic"
    "github.com/magicbutton/magic-messages/database"
    "github.com/magicbutton/magic-messages/services/models/surveymodel"
    . "github.com/magicbutton/magic-messages/utils"
)

func SurveySearch(query string) (*Page[surveymodel.Survey], error) {
    log.Println("Calling Surveysearch")

    return applogic.Search[database.Survey, surveymodel.Survey]("name", query, applogic.MapSurveyOutgoing)

}
