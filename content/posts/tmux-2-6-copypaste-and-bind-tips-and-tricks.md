+++
author = "jldeen"
date = 2017-09-19T17:09:36Z
description = ""
draft = false
image = "../../images/Screen-Shot-2017-09-19-at-17.02.51_ypjwrv.png"
slug = "tmux-2-6-copypaste-and-bind-tips-and-tricks"
title = "Tmux 2.6 copy/paste and bind tips and tricks!"
layout = "post"

+++


I recently updated my tmux install to the latest version 2.6-rc3. I hadn’t updated since prior to April. When I did update, my former .tmux.conf I mentioned in my [macOS ohmyzsh + tmux + vim + iTerm2 + Powerlevel9k = Badass terminal](https:/jessicadeen.com/tech/macos-ohmyzsh-tmux-vim-iterm2-powerlevel9k-badass-terminal/) blog post had several errors due to breaking changes. This post will address the ones that took me a little while to solve.

The simple explanation of what broke is copy/paste from within tmux and most bind-key commands.

In short, I learned key tables changed dramatically from version 2.3 to version 2.4. As quoted in [tmux’s changes.md](https://raw.githubusercontent.com/tmux/tmux/master/CHANGES):

Mode key tables are no longer separate from the main key tables. All mode key tables have been removed, together with the -t flag to bind-key and unbind-key. The emacs-edit, vi-edit, emacs-choose and vi-choose tables have been replaced by fixed key bindings in the command prompt and choose modes. The mode-keys and status-keys options remain. The emacs-copy and vi-copy tables have been replaced by the copy-mode and copy-mode-vi tables. Commands are sent using the -X and -N flags to send-keys. So the following: bind -temacs-copy C-Up scroll-up bind -temacs-copy -R5 WheelUpPane scroll-up Becomes: bind -Tcopy-mode C-Up send -X scroll-up bind -Tcopy-mode WheelUpPane send -N5 -X scroll-up

There are also new commands with send -X now such as copy-pipe-and-cancel, which we will use shortly. As a result, I couldn’t copy and paste anymore from either a mouse drag or using keys. I updated my file to the following configuration:

# Mouse support ------------------------------------------------ set -g mouse on bind-key -T copy-mode-vi WheelUpPane send -X scroll-up bind-key -T copy-mode-vi WheelDownPane send -X scroll-down # # Vi copypaste setw -g mode-keys vi bind-key -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "reattach-to-user-namespace pbcopy" bind-key -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel "reattach-to-user-namespace pbcopy" \; display-message "highlighted selection copied to system clipboard" # End Mouse support --------------------------------------------

As you’ll see, I am now using the new “copy-pipe-and-cancel” command, I am specifying MouseDragEnd1Pane, and I even include a confirmation message to confirm a successful copy to the clipboard.

I hope this saves someone time as it took me several hours of searching to discover the solution to fix the broken copy paste function. On the same topic of broken configurations, I also learned my scroll ability was broken from within vim (and probably other parts of my terminal). I could scroll down, but not up; when I would attempt, I could get command history, not the actual buffer window scroll. First, I discovered I could temporarily fix this by holding shift as I scroll, but that was not a long-term solution. At last, I discovered from [this GitHub issue thread](https://github.com/bpython/bpython/issues/517) I could press ‘Command+r’ to reset the terminal state, which fixed the problem.

For those interested, you can view my .vimrc, .zshrc, and .tmux.conf files [here](https://github.com/jldeen/bad-ass-terminal).

