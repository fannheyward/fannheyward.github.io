---
layout: post
title: Ansible notes
date: 2017-05-26 16:11:09 +0800
---

Ansible 是基于 SSH 的自动化配置管理和部署工具，更多请参考[官方文档][1]。

```
ansible -i hosts.ini all -m ping
ansible-playbook -i hosts.ini playbook.yaml
```

用 Ansible + Supervisor 部署／更新应用：

```yaml
- hosts: server
  tasks:
  - name: check if exists
    stat: path=/path/to/app
    register: check_path
  - name: clone
    shell: git clone XXX && git checkout -b release
    when: check_path.stat.exists == false
  - name: pull
    shell: cd /path/to/app && git pull origin release
    when: check_path.stat.exists
  - name: is already running ?
    stat: path=/tmp/supervisord.pid
    register: supervisord_stat
  - name: restart
    command: supervisorctl -c supervisord.conf restart all
    args:
      chdir: /path/to/app
    when: supervisord_stat.stat.exists
  - name: start
    command: supervisord -c supervisord.conf
    args:
      chdir: /path/to/app
    when: supervisord_stat.stat.exists == false
```

* [Ansible Galaxy][5]
* [An Ansible Tutorial][2]
* [iOS Dev Playbook][3]
* [Mac Development Ansible Playbook][4]

[1]: http://docs.ansible.com/ansible/intro.html
[2]: https://serversforhackers.com/an-ansible-tutorial
[3]: https://github.com/lexrus/ios-dev-playbook
[4]: https://github.com/geerlingguy/mac-dev-playbook
[5]: https://galaxy.ansible.com/explore#/
