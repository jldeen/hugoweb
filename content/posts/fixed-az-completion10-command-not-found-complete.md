+++
author = "jldeen"
date = 2018-01-11T18:18:08Z
description = ""
draft = false
image = "../../images/fixing-stuff_pu6edm.jpg"
slug = "fixed-az-completion10-command-not-found-complete"
title = "Fixed! az.completion:10: command not found: complete"

+++


I was hanging out with a colleague earlier today (name drop: Burke Holland) and he roped me into fixing his terminal. He had the awful “az.completion:10: command not found: complete” error stuck in his zsh environment for around 8 months and I thought, “He can’t be the only one!” Enter: this blog post!

If you’re like Burke, simply open your .zshrc file and add the following line before sourcing az.completion:

autoload bashcompinit && bashcompinit

To confirm, your az.completion section should now look like this:

autoload bashcompinit && bashcompinit source '/Users/jessicadeen/lib/azure-cli/az.completion'

That’s it! This is a known open issue on GitHub and is caused by using the curl method to install Az CLI when your default shell is set to zsh rather than bash.

Hope this helps!

