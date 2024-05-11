package main

import (
	"runtime/debug"
	"strings"

	"github.com/magicbutton/magic-messages/magicapp"
	"github.com/magicbutton/magic-messages/utils"
)

func main() {
	info, _ := debug.ReadBuildInfo()

	// split info.Main.Path by / and get the last element
	s1 := strings.Split(info.Main.Path, "/")
	name := s1[len(s1)-1]
	description := `---
title: magic-messages
description: Describe the main purpose of this kitchen
---

# magic-messages
`
	utils.Setup(".env")
	magicapp.RegisterServeCmd("magic-messages", description, "0.0.1", 8080)
	magicapp.RegisterCmds()
	magicapp.RegisterServiceCmd()

	utils.RootCmd.PersistentFlags().BoolVarP(&utils.Verbose, "verbose", "v", false, "verbose output")

	magicapp.Execute(name, "magic-messages", "")
}
