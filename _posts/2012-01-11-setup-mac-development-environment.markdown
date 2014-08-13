---
layout: post
title: "Setup Mac Development Environment"
date: 2012-01-11 11:17
categories: [Dev]
---

1. System Software Update.
1. Download and install Xcode, or **Command Line Tools for Xcode** only if you don't need Xcode.
1. Install [Homebrew][Homebrew].
1. Get back your dotfiles if you have.

----
## Python

1. Use `pip` instead of `easy_install`
1. Use `pip` to install `virtualenv` and `virtualenvwrapper`

```
# use easy_install to install pip
sudo easy_install pip
# where pip
/usr/local/bin/pip
# virtualenv
sudo pip install virtualenv
# which virtualenv
/usr/local/bin/virtualenv
# virtualenvwrapper
sudo pip install virtualenvwrapper
# virtualenvwrapper will be installed in /usr/local/bin/virtualenvwrapper.sh
# config virtualenvwrapper
mkdir ~/.virtualenvs
# edit .zshrc and add
export WORKON_HOME=$HOME/.virtualenvs
source /usr/local/bin/virtualenvwrapper.sh
```

----
## Ruby

Install [RVM][RVM]

```
# add to .zshrc
[[ -s $HOME/.rvm/scripts/rvm ]] && source $HOME/.rvm/scripts/rvm
# install ruby by rvm
rvm install 1.9.2 && rvm use 1.9.2
rvm rubygems latest
```

[Homebrew]:https://github.com/mxcl/homebrew/wiki/installation
[RVM]:https://rvm.beginrescueend.com/

