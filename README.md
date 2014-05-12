# jxset


jxset is a simple php/javascript solution for presenting and managing data over the web.

It enables you to easily present and manage data on a web page.

### Basic Installation

* Download or clone the jxset project and place it on your web server document root.
* To clone the jqGrid submodule, cd to the project root directory (~/jxset) and issue the following command:<br>git submodule update --init --recursive
* Run the sql script located in jxset/demo/jxset.sql on your mysql server, that will create a new database named 'jxset'.
* Set your mysql user/password in the config file located in jxset/jset/server/class/config.class.php (default setting is root with no password).
* Open a browser window and go to yourserver/jxset/demo - You should see a list of databases on your server and you should be able to view, search and edit data.

