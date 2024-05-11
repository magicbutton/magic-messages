// -------------------------------------------------------------------
// Generated by 365admin-publish/api/20 makeschema.ps1
// -------------------------------------------------------------------
/*
---
title: Get  User
---
*/
package endpoints

import (
	"context"
	"encoding/json"
	"os"
	"path"

	"github.com/swaggest/usecase"

	"github.com/magicbutton/magic-messages/execution"
	"github.com/magicbutton/magic-messages/schemas"
	"github.com/magicbutton/magic-messages/utils"
)

func UsecasesGetUserPost() usecase.Interactor {
	type Request struct {
		Userid string `query:"userid" binding:"required"`
	}
	u := usecase.NewInteractor(func(ctx context.Context, input Request, output *schemas.User) error {

		_, err := execution.ExecutePowerShell("john", "*", "magic-messages", "05-usecases", "10-get-user.ps1", "", "-userid", input.Userid)
		if err != nil {
			return err
		}

		resultingFile := path.Join(utils.WorkDir("magic-messages"), "user.json")
		data, err := os.ReadFile(resultingFile)
		if err != nil {
			return err
		}
		resultObject := schemas.User{}
		err = json.Unmarshal(data, &resultObject)
		*output = resultObject
		return err

	})
	u.SetTitle("Get  User")
	// u.SetExpectedErrors(status.InvalidArgument)
	u.SetTags("Use Cases")
	return u
}
