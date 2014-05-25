-- --------------------------------------------------------
-- מארח:                         127.0.0.1
-- Server version:               5.5.16 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL גירסא:               8.1.0.4545
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for jxset
CREATE DATABASE IF NOT EXISTS `jxset` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `jxset`;


-- Dumping structure for table jxset.demo
DROP TABLE IF EXISTS `demo`;
CREATE TABLE IF NOT EXISTS `demo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `char` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `text` text,
  `date` date DEFAULT NULL,
  `image` varchar(1024) DEFAULT NULL,
  `video` varchar(1024) DEFAULT NULL,
  `integer` int(11) DEFAULT NULL,
  `decimal` decimal(11,2) DEFAULT NULL,
  `boolean` tinyint(1) unsigned DEFAULT NULL,
  `select` smallint(6) unsigned DEFAULT NULL,
  `multiselect` varchar(1024) DEFAULT NULL,
  `multicheckbox` varchar(1024) DEFAULT NULL,
  `link` varchar(1024) DEFAULT NULL,
  `html` mediumtext,
  PRIMARY KEY (`id`),
  KEY `Index_integer` (`integer`),
  KEY `Index_varchar` (`char`),
  KEY `Index_select` (`select`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- Dumping data for table jxset.demo: ~18 rows (approximately)
/*!40000 ALTER TABLE `demo` DISABLE KEYS */;
REPLACE INTO `demo` (`id`, `char`, `text`, `date`, `image`, `video`, `integer`, `decimal`, `boolean`, `select`, `multiselect`, `multicheckbox`, `link`, `html`) VALUES
	(2, 'r', 't', '2013-07-03', NULL, NULL, 12666, 23.98, 1, 2, NULL, NULL, 'yy', '<div>&nbsp;</div>'),
	(3, 'ff', 'to lead', '2013-06-26', NULL, NULL, 96543, 85.00, 0, 3, '2,4', NULL, 'ok', '<div>&nbsp;</div>'),
	(4, 'זה שיר פרידה אז בואי רק אמרי שלום', 'יקבל את המגיע לו', '2013-06-05', NULL, NULL, 222, 21.90, 1, 3, NULL, NULL, 'https://github.com/shuki/jxset', '<div>&nbsp;</div>'),
	(5, NULL, 'uk', NULL, NULL, NULL, 76, 55.00, 0, 2, NULL, NULL, '77', '<div>&nbsp;</div>'),
	(6, 'dd', 'זה דבר נהדר', NULL, NULL, NULL, 65, 65.00, 0, 2, '3,4', NULL, 'https://github.com/shuki/jxset', '<div>&nbsp;</div>'),
	(7, 'tt', 'yy', NULL, NULL, NULL, 67, NULL, 0, 1, NULL, NULL, 'uu', '<div>&nbsp;</div>'),
	(8, 'asdasd', 'asdasd', '2013-06-25', NULL, NULL, 222, NULL, 0, 1, NULL, NULL, 'qwqw', '<div>&nbsp;</div>'),
	(9, 'to bo', 'yes', '1999-07-08', NULL, NULL, 222, NULL, 0, 3, NULL, NULL, 'to link', '<div>&nbsp;</div>'),
	(10, 'as', 'xc', NULL, NULL, NULL, NULL, NULL, 0, 2, NULL, NULL, 'er', NULL),
	(12, 'as', 'sa', NULL, NULL, NULL, NULL, NULL, 0, 2, NULL, NULL, 'sa', NULL),
	(13, 'as', 'sa', NULL, NULL, NULL, NULL, NULL, 0, 2, NULL, NULL, 'sa', NULL),
	(14, 'as', 'sa', NULL, NULL, NULL, NULL, NULL, 0, 2, NULL, NULL, 'sa', NULL),
	(15, 'r', 't', '2013-07-03', NULL, NULL, 12666, 23.98, 1, 2, NULL, NULL, 'yy', '<div>&nbsp;</div>'),
	(16, 'שדג', 'שדג', NULL, NULL, NULL, NULL, NULL, 0, 2, NULL, NULL, 'שדגשדג', NULL),
	(17, 'שדג', 'שדג', NULL, NULL, NULL, NULL, NULL, 0, 2, NULL, NULL, 'שדגשדג', NULL),
	(18, 'r', 't', '2013-07-03', NULL, NULL, 12666, 23.98, 1, 2, NULL, NULL, 'yy', '<div>&nbsp;</div>'),
	(19, 'זסב', 'סזב', NULL, NULL, NULL, NULL, NULL, 0, 2, NULL, NULL, 'קרארקא', NULL),
	(20, 'asdasd', 'asdasd', '2013-06-25', NULL, NULL, 222, NULL, 0, 1, NULL, NULL, 'qwqw', '<div>&nbsp;</div>');
/*!40000 ALTER TABLE `demo` ENABLE KEYS */;


-- Dumping structure for function jxset.f_date_unformat
DROP FUNCTION IF EXISTS `f_date_unformat`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `f_date_unformat`(vvalue varchar(20)) RETURNS date
BEGIN
  declare dpos, dpos_next tinyint;
  declare dyeari smallint;
  declare dday, dmonth, dyear char(4);

  if vvalue is null then
    return null;
  end if;

  set dpos = (SELECT LOCATE('/', vvalue));
  set dday = substr(vvalue, 1, dpos -1);
  set dpos_next = dpos + 1;
  set dpos = (SELECT LOCATE('/', vvalue, dpos_next));
  set dmonth = substr(vvalue, dpos_next, dpos - dpos_next);
  set dpos_next = dpos + 1;
  set dyear = substr(vvalue, dpos_next);
  if length(dyear) = 2 then
    set dyeari = cast(dyear as unsigned) + 2000;
    if dyeari > 2030 then
      set dyeari = dyeari - 100;
    end if;
    set dyear = cast(dyeari as char(4));
  end if;

  return cast(concat(dyear, '-', dmonth, '-', dday) as date);

END//
DELIMITER ;


-- Dumping structure for function jxset.f_insert_jset_atom
DROP FUNCTION IF EXISTS `f_insert_jset_atom`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `f_insert_jset_atom`(vkind tinyint, vweb_user varchar(45), vip varchar(45)) RETURNS bigint(20)
BEGIN
  DECLARE did BIGINT DEFAULT UUID_SHORT();

  INSERT INTO jset_atom (id, stamp, user, kind, web_user, ip)
    VALUES (did, NOW(), USER(), vkind, vweb_user, vip);

  RETURN did;
END//
DELIMITER ;


-- Dumping structure for function jxset.f_insert_jset_atom_no_uuid
DROP FUNCTION IF EXISTS `f_insert_jset_atom_no_uuid`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `f_insert_jset_atom_no_uuid`(vkind tinyint, vweb_user varchar(45), vip varchar(45)) RETURNS bigint(20)
BEGIN
  INSERT INTO jset_atom (id, stamp, user, kind, web_user, ip)
    VALUES (null, NOW(), USER(), vkind, vweb_user, vip);

  RETURN (SELECT LAST_INSERT_ID());
END//
DELIMITER ;


-- Dumping structure for function jxset.f_numeric_only
DROP FUNCTION IF EXISTS `f_numeric_only`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `f_numeric_only`(`str` VARCHAR(1000)) RETURNS varchar(1000) CHARSET utf8
    DETERMINISTIC
BEGIN
  DECLARE counter INT DEFAULT 0;
  DECLARE strLength INT DEFAULT 0;
  DECLARE strChar VARCHAR(1000) DEFAULT '' ;
  DECLARE retVal VARCHAR(1000) DEFAULT '';

  SET strLength = LENGTH(str);

  WHILE strLength > 0 DO
    SET counter = counter+1;
    SET strChar = SUBSTRING(str,counter,1);
    IF strChar REGEXP('[0-9]+') = 1
      THEN SET retVal = CONCAT(retVal,strChar);
    END IF;
    SET strLength = strLength -1;
    SET strChar = NULL;
  END WHILE;
RETURN if(retVal = '', null, retVal) ;
END//
DELIMITER ;


-- Dumping structure for function jxset.f_sql
DROP FUNCTION IF EXISTS `f_sql`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `f_sql`() RETURNS varchar(8000) CHARSET utf8
BEGIN
return 'select * from test';

END//
DELIMITER ;


-- Dumping structure for table jxset.jset_atom
DROP TABLE IF EXISTS `jset_atom`;
CREATE TABLE IF NOT EXISTS `jset_atom` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `stamp` datetime NOT NULL,
  `user` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `kind` tinyint(3) unsigned DEFAULT NULL,
  `web_user` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `ip` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=FIXED;

-- Dumping data for table jxset.jset_atom: ~0 rows (approximately)
/*!40000 ALTER TABLE `jset_atom` DISABLE KEYS */;
/*!40000 ALTER TABLE `jset_atom` ENABLE KEYS */;


-- Dumping structure for table jxset.jset_column
DROP TABLE IF EXISTS `jset_column`;
CREATE TABLE IF NOT EXISTS `jset_column` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent` int(10) unsigned NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `index` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `control` varchar(45) DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT NULL,
  `readonly` tinyint(1) DEFAULT NULL,
  `edithidden` tinyint(1) unsigned DEFAULT NULL,
  `noedit` tinyint(1) unsigned DEFAULT NULL,
  `unsortable` tinyint(1) unsigned DEFAULT NULL,
  `export` tinyint(1) unsigned DEFAULT NULL,
  `position` smallint(5) DEFAULT NULL,
  `rowpos` tinyint(4) DEFAULT NULL,
  `rowlabel` varchar(200) DEFAULT NULL,
  `default_value` varchar(2000) DEFAULT NULL,
  `search_default` varchar(100) DEFAULT NULL,
  `width` varchar(20) DEFAULT NULL,
  `usize` varchar(20) DEFAULT NULL,
  `height` varchar(20) DEFAULT NULL,
  `list` varchar(4000) DEFAULT NULL,
  `src` varchar(200) DEFAULT NULL,
  `override` varchar(200) DEFAULT NULL,
  `help` varchar(2000) DEFAULT NULL,
  `validation` varchar(4000) DEFAULT NULL,
  `aggregate` varchar(200) DEFAULT NULL,
  `object` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `parent` (`parent`,`name`),
  CONSTRAINT `FK_jset_table_parent` FOREIGN KEY (`parent`) REFERENCES `jset_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=577 DEFAULT CHARSET=utf8;

-- Dumping data for table jxset.jset_column: ~75 rows (approximately)
/*!40000 ALTER TABLE `jset_column` DISABLE KEYS */;
REPLACE INTO `jset_column` (`id`, `parent`, `name`, `index`, `title`, `control`, `hidden`, `readonly`, `edithidden`, `noedit`, `unsortable`, `export`, `position`, `rowpos`, `rowlabel`, `default_value`, `search_default`, `width`, `usize`, `height`, `list`, `src`, `override`, `help`, `validation`, `aggregate`, `object`) VALUES
	(1, 1, 'source', NULL, 'Source', 'textarea', 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '100', '8', 'v_source', NULL, NULL, 'The data source of this record.', NULL, NULL, NULL),
	(2, 1, 'target', NULL, 'Target', NULL, 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'v_target', NULL, NULL, 'The data target of this record.', NULL, NULL, NULL),
	(3, 1, 'validation', NULL, 'Validation', 'textarea', 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, '100', '8', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(4, 1, 'help', 'help_table', 'Help', 'editor', 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Help about the jset_table grid as a whole. It is available by pressing the lamp button on the grid.', NULL, NULL, NULL),
	(5, 1, 'title', 'title_table', 'Title', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '40', NULL, NULL, NULL, NULL, 'The title of the grid using this record as it\'s source.', NULL, NULL, NULL),
	(6, 1, 'id', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(7, 1, 'name', NULL, 'Name', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '40', NULL, NULL, NULL, NULL, 'The name of this jset_table record.', NULL, NULL, NULL),
	(8, 1, 'description', NULL, 'Description', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '100', NULL, NULL, NULL, NULL, 'Description of this record, free text.', NULL, NULL, NULL),
	(9, 1, 'system', NULL, 'System', 'checkbox', 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, '0', '30', NULL, NULL, NULL, NULL, NULL, 'If this is a system table, check it.', NULL, NULL, 'searchoptions:{\r\n	sopt: [\'eq\']\r\n}'),
	(10, 2, 'unsortable', NULL, 'Unsortable', 'checkbox', 0, 0, 0, 0, NULL, 1, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Check this field if you wish this column to not be sortable.', NULL, NULL, 'searchoptions:{\r\n	sopt: [\'eq\']\r\n}'),
	(11, 2, 'object', NULL, 'Object', 'textarea', 0, 0, 0, 0, 0, 1, NULL, 100, NULL, NULL, NULL, NULL, '120', '4', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(12, 2, 'parent', NULL, 'Parent', 'int', 1, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'searchoptions:{\r\n	sopt: [\'eq\']\r\n}'),
	(13, 2, 'id', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(128, 3, 'id', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(129, 3, 'parent', NULL, NULL, 'int', 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'searchoptions:{\r\n	sopt: [\'eq\']\r\n}'),
	(131, 3, 'help', NULL, 'Tip', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(138, 3, 'field', NULL, 'Field', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, '20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(165, 4, 'id', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(166, 4, 'parent', NULL, NULL, 'int', 1, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'searchoptions:{\r\n	sopt: [\'eq\']\r\n}'),
	(167, 4, 'before_insert', NULL, 'Before Insert', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Php method(s) to execute before inserting a record. Methods are separated by the tilda (~) character.', NULL, NULL, NULL),
	(168, 4, 'after_insert', NULL, 'After Insert', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Php method(s) to execute after inserting a record. Methods are separated by the tilda (~) character.', NULL, NULL, NULL),
	(169, 4, 'before_select', NULL, 'Before Select', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Not in use.', NULL, NULL, NULL),
	(170, 4, 'after_select', NULL, 'After Select', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Not in use yet.', NULL, NULL, NULL),
	(171, 4, 'before_update', NULL, 'Before Update', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Php method(s) to execute before updating a record. Methods are separated by the tilda (~) character.', NULL, NULL, NULL),
	(172, 4, 'after_update', NULL, 'After Update', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Php method(s) to execute after updating a record. Methods are separated by the tilda (~) character.', NULL, NULL, NULL),
	(173, 4, 'before_delete', NULL, 'Before Delete', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Php method(s) to execute before deleting record(s). Methods are separated by the tilda (~) character.', NULL, NULL, NULL),
	(174, 4, 'after_delete', NULL, 'After Delete', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Php method(s) to execute after deleting record(s). Methods are separated by the tilda (~) character.', NULL, NULL, NULL),
	(181, 2, 'name', NULL, 'Name', NULL, 0, 0, 0, 0, NULL, 1, NULL, 10, NULL, NULL, NULL, NULL, '20', NULL, NULL, NULL, NULL, 'The name of this field. That should match the name of the field in the table or view.', NULL, NULL, NULL),
	(182, 2, 'index', NULL, 'Index', NULL, 0, 0, 0, 0, NULL, 1, NULL, 10, NULL, NULL, NULL, NULL, '20', NULL, NULL, NULL, NULL, 'When we have more than one grid on a page and a field have the same name on different grids, use this attribute to set a different id for a field.', NULL, NULL, NULL),
	(183, 2, 'title', NULL, 'Title', NULL, 0, 0, 0, 0, NULL, 1, NULL, 10, NULL, NULL, NULL, NULL, '20', NULL, NULL, NULL, NULL, 'The title of the field.', NULL, NULL, NULL),
	(184, 2, 'control', NULL, 'Control', NULL, 0, 0, 0, 0, NULL, 1, NULL, 20, NULL, NULL, NULL, NULL, '20', NULL, NULL, NULL, NULL, 'The gui control for this field. The full list of available controls can be found in the file jset/jquery/js/jquery.jset.components.js.', NULL, NULL, NULL),
	(185, 2, 'hidden', NULL, 'Hidden', 'checkbox', 0, 0, 0, 0, NULL, 1, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Set to hide the field.', NULL, NULL, 'searchoptions:{\r\n	sopt: [\'eq\']\r\n}'),
	(186, 2, 'edithidden', NULL, 'Edit Hidden', 'checkbox', 0, 0, 0, 0, NULL, 1, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'In conjunction with the hidden attribute, let an hidden filed be editable in the form.', NULL, NULL, 'searchoptions:{\r\n	sopt: [\'eq\']\r\n}'),
	(187, 2, 'noedit', NULL, 'No Edit', 'checkbox', 0, 0, 0, 0, NULL, 1, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Set to hide the field in the form, but show the field in the grid.', NULL, NULL, 'searchoptions:{\r\n	sopt: [\'eq\']\r\n}'),
	(188, 2, 'list', NULL, 'List', 'textarea', 0, 0, 0, 0, 0, 1, NULL, 20, NULL, NULL, NULL, NULL, '80', '4', NULL, NULL, NULL, 'For the selectbox control, specify the name of the table or view of the control items.', NULL, NULL, NULL),
	(189, 2, 'rowpos', NULL, 'Row Position', NULL, 0, 0, 0, 0, NULL, 1, NULL, 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Specifying fields with the same rowpos will cause them to be displayed on the same row in the edit form.', NULL, NULL, NULL),
	(190, 2, 'rowlabel', NULL, 'Row Label', NULL, 0, 0, 0, 0, NULL, 1, NULL, 40, NULL, NULL, NULL, NULL, '60', NULL, NULL, NULL, NULL, 'When using the rowpos attribute, this attribute sets the row lable.', NULL, NULL, NULL),
	(191, 2, 'position', NULL, 'Position', NULL, 0, 0, 0, 0, NULL, 1, NULL, 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Control the order of the fields in the grid and in the form. By default fields are shown in the order of their appearance in the table/view of the source. The list is furthur ordered by the numbers in this attribute.', NULL, NULL, NULL),
	(192, 2, 'readonly', NULL, 'Read Only', 'checkbox', 0, 0, 0, 0, NULL, 1, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Sets a field to be readonly.', NULL, NULL, 'searchoptions:{\r\n	sopt: [\'eq\']\r\n}'),
	(193, 2, 'default_value', NULL, 'Default Value', NULL, 0, 0, 0, 0, NULL, 1, NULL, 70, NULL, NULL, NULL, NULL, '100', NULL, NULL, NULL, NULL, 'The default value for this field when creating a new record.', NULL, NULL, NULL),
	(194, 2, 'search_default', NULL, 'Default Filter', NULL, 0, 0, 0, 0, NULL, 1, NULL, 72, NULL, NULL, NULL, NULL, '100', NULL, NULL, NULL, NULL, 'The default filter for this field.', NULL, NULL, NULL),
	(195, 2, 'override', NULL, 'Override', NULL, 0, 0, 0, 0, 0, 1, NULL, 75, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(196, 2, 'width', NULL, 'Column Width', NULL, 0, 0, 0, 0, NULL, 1, NULL, 60, NULL, NULL, NULL, NULL, '10', NULL, NULL, NULL, NULL, 'The width of the field in grid view. Note that the width is relative to the other fields in the grid. The default width is 80. Specifying a number greater than 80 will increase the width and vise versa.', NULL, NULL, NULL),
	(197, 2, 'usize', NULL, 'Field Width', NULL, 0, 0, 0, 0, NULL, 1, NULL, 60, NULL, NULL, NULL, NULL, '10', NULL, NULL, NULL, NULL, 'The width of the field in the edit form.', NULL, NULL, NULL),
	(198, 2, 'height', NULL, 'Field Height', NULL, 0, 0, 0, 0, NULL, 1, NULL, 60, NULL, NULL, NULL, NULL, '10', NULL, NULL, NULL, NULL, 'The height of this field\'s control in the form.', NULL, NULL, NULL),
	(199, 2, 'src', NULL, 'Source Url', NULL, 0, 0, 0, 0, NULL, 1, NULL, 20, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, 'For the grid_frame control the url of the page to be shown.', NULL, NULL, NULL),
	(200, 2, 'help', NULL, 'Help', 'textarea', 0, 0, 0, 0, NULL, 1, NULL, 90, NULL, NULL, NULL, NULL, '120', '4', NULL, NULL, NULL, 'The help text for this field. The text is shown in the edit and view forms when we mouse over the field\'s title.', NULL, NULL, NULL),
	(201, 2, 'validation', NULL, 'Validation', 'textarea', 0, 0, 0, 0, NULL, 1, NULL, 80, NULL, NULL, NULL, NULL, '120', '4', NULL, NULL, NULL, 'Validation rules using the jquery validator plugin syntax.', NULL, NULL, NULL),
	(202, 2, 'aggregate', NULL, 'Aggregate', NULL, 0, 0, 0, 0, 0, 1, NULL, 78, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Aggregation function to perform on the column, to be displayed on the footer row of the grid (if present).', NULL, NULL, NULL),
	(204, 5, 'active', NULL, 'Active', 'checkbox', 1, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'searchoptions:{\r\n	sopt: [\'eq\']\r\n}'),
	(206, 5, 'host', NULL, 'Host', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, 'IP address or domain of the host.', NULL, NULL, NULL),
	(207, 5, 'id', NULL, NULL, NULL, 1, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(208, 5, 'name', NULL, 'Name', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, 'Name of the host, free text.', NULL, NULL, NULL),
	(209, 5, 'password', NULL, 'Password', 'password', 1, 0, 1, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, 'Database user password.', NULL, NULL, NULL),
	(210, 5, 'user', NULL, 'User', NULL, 0, 0, 0, 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, 'Database user name.', NULL, NULL, NULL),
	(217, 5, 'db_name', NULL, 'Database', NULL, 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, 'Database name.', NULL, NULL, NULL),
	(227, 6, 'id', NULL, NULL, NULL, 0, 1, 1, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(228, 6, 'name', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(229, 6, 'integer', NULL, 'מספריי', 'int', 0, 0, 0, 0, 0, 1, 0, 0, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, NULL, NULL, 'max(`integer`)', NULL),
	(230, 6, 'boolean', NULL, 'Boolean', 'checkbox', 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sum(`boolean`)', 'searchoptions:{\n	sopt: [\'eq\', \'ne\']\n}'),
	(231, 6, 'text', NULL, NULL, 'textarea', 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, '50', '4', NULL, NULL, NULL, NULL, 'required:true', NULL, NULL),
	(232, 6, 'decimal', NULL, NULL, NULL, 0, 0, 0, 0, 0, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sum(`decimal`)', NULL),
	(233, 6, 'picture', NULL, NULL, 'upload_image', 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(234, 6, 'select', NULL, NULL, 'selectbox', 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, '2', NULL, NULL, NULL, NULL, 'select 1 as id, \'Good\' as name\nunion\nselect 2, \'Bad\'\nunion\nselect 3, \'Average\'', NULL, NULL, NULL, 'required:true', NULL, NULL),
	(235, 6, 'video', NULL, NULL, 'upload_video', 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(236, 6, 'multiselect', NULL, NULL, 'multiselect', 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'select 1 as id, \'יוסי\' as name\nunion\nselect 2, \'שאול\'\nunion\nselect 3, \'שוקי\'\nunion\nselect 4, \'תמיר\'', NULL, NULL, NULL, NULL, NULL, NULL),
	(237, 6, 'date', 'dateme', 'התאריך', 'custom_date', 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(552, 6, 'char', NULL, 'שדה רגיל', NULL, 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'required:true', NULL, NULL),
	(553, 6, 'image', NULL, NULL, 'upload_file', 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(554, 6, 'link', NULL, NULL, NULL, 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'required:true', NULL, NULL),
	(555, 6, 'html', NULL, NULL, 'editor', 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, '120', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(559, 6, 'multicheckbox', NULL, NULL, 'multicheckbox', 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'v_list_control', NULL, NULL, NULL, NULL, NULL, NULL),
	(574, 6, 'residents', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(575, 2, 'export', NULL, 'Export', 'checkbox', 0, 0, 0, 0, 0, 1, NULL, 30, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'searchoptions:{\r\n	sopt: [\'eq\']\r\n}'),
	(576, 1, 'section', NULL, 'Section', NULL, 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `jset_column` ENABLE KEYS */;


-- Dumping structure for table jxset.jset_default_column
DROP TABLE IF EXISTS `jset_default_column`;
CREATE TABLE IF NOT EXISTS `jset_default_column` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Type` varchar(100) DEFAULT NULL,
  `Collation` varchar(100) DEFAULT NULL,
  `Null` varchar(100) DEFAULT NULL,
  `Key` varchar(100) DEFAULT NULL,
  `Default` varchar(100) DEFAULT NULL,
  `Extra` varchar(100) DEFAULT NULL,
  `Privileges` varchar(100) DEFAULT NULL,
  `Comment` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table jxset.jset_default_column: ~1 rows (approximately)
/*!40000 ALTER TABLE `jset_default_column` DISABLE KEYS */;
REPLACE INTO `jset_default_column` (`id`, `Type`, `Collation`, `Null`, `Key`, `Default`, `Extra`, `Privileges`, `Comment`) VALUES
	(1, 'varchar', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `jset_default_column` ENABLE KEYS */;


-- Dumping structure for table jxset.jset_error
DROP TABLE IF EXISTS `jset_error`;
CREATE TABLE IF NOT EXISTS `jset_error` (
  `id` bigint(20) NOT NULL,
  `message` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `query` varchar(4000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `params` varchar(8000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table jxset.jset_error: ~0 rows (approximately)
/*!40000 ALTER TABLE `jset_error` DISABLE KEYS */;
/*!40000 ALTER TABLE `jset_error` ENABLE KEYS */;


-- Dumping structure for table jxset.jset_event
DROP TABLE IF EXISTS `jset_event`;
CREATE TABLE IF NOT EXISTS `jset_event` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent` int(10) unsigned NOT NULL,
  `before_insert` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `after_insert` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `before_select` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `after_select` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `before_update` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `after_update` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `before_delete` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `after_delete` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `parent` (`parent`) USING BTREE,
  CONSTRAINT `FK_jset_event_parent` FOREIGN KEY (`parent`) REFERENCES `jset_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Dumping data for table jxset.jset_event: ~3 rows (approximately)
/*!40000 ALTER TABLE `jset_event` DISABLE KEYS */;
REPLACE INTO `jset_event` (`id`, `parent`, `before_insert`, `after_insert`, `before_select`, `after_select`, `before_update`, `after_update`, `before_delete`, `after_delete`) VALUES
	(1, 1, NULL, 'jset_columns_mysql::create_columns(id,source)~jset_event::create_event(id)', NULL, NULL, NULL, 'jset_columns_mysql::create_columns(id,source)~jset_event::create_event(id)', NULL, NULL),
	(2, 6, 'application::subtract5(id)', 'application::multiply5(id)~application::subtract5(id)', NULL, NULL, 'application::subtract5(id)~application::multiply5(id)~application::subtract5(id)', 'application::multiply5(id)~application::subtract5(id)', NULL, NULL),
	(3, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `jset_event` ENABLE KEYS */;


-- Dumping structure for table jxset.jset_host
DROP TABLE IF EXISTS `jset_host`;
CREATE TABLE IF NOT EXISTS `jset_host` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `active` tinyint(4) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `host` varchar(100) DEFAULT NULL,
  `port` varchar(50) DEFAULT NULL,
  `server` varchar(100) DEFAULT NULL,
  `db_name` varchar(45) DEFAULT NULL,
  `user` varchar(40) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- Dumping data for table jxset.jset_host: ~5 rows (approximately)
/*!40000 ALTER TABLE `jset_host` DISABLE KEYS */;
REPLACE INTO `jset_host` (`id`, `active`, `name`, `host`, `port`, `server`, `db_name`, `user`, `password`) VALUES
	(23, 1, 'jxset', 'localhost', '3306', 'mysql', 'jxset', 'root', '');
/*!40000 ALTER TABLE `jset_host` ENABLE KEYS */;


-- Dumping structure for table jxset.jset_layout
DROP TABLE IF EXISTS `jset_layout`;
CREATE TABLE IF NOT EXISTS `jset_layout` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent` int(10) unsigned DEFAULT NULL,
  `name` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `pos` tinyint(3) unsigned DEFAULT NULL,
  `prefix` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `suffix` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Dumping data for table jxset.jset_layout: ~0 rows (approximately)
/*!40000 ALTER TABLE `jset_layout` DISABLE KEYS */;
/*!40000 ALTER TABLE `jset_layout` ENABLE KEYS */;


-- Dumping structure for table jxset.jset_list
DROP TABLE IF EXISTS `jset_list`;
CREATE TABLE IF NOT EXISTS `jset_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tid` int(10) unsigned NOT NULL DEFAULT '0',
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Index_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table jxset.jset_list: ~0 rows (approximately)
/*!40000 ALTER TABLE `jset_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `jset_list` ENABLE KEYS */;


-- Dumping structure for table jxset.jset_semaphore
DROP TABLE IF EXISTS `jset_semaphore`;
CREATE TABLE IF NOT EXISTS `jset_semaphore` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stamp_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stamp_end` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table jxset.jset_semaphore: ~0 rows (approximately)
/*!40000 ALTER TABLE `jset_semaphore` DISABLE KEYS */;
/*!40000 ALTER TABLE `jset_semaphore` ENABLE KEYS */;


-- Dumping structure for table jxset.jset_sql
DROP TABLE IF EXISTS `jset_sql`;
CREATE TABLE IF NOT EXISTS `jset_sql` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sql` varchar(8000) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table jxset.jset_sql: ~0 rows (approximately)
/*!40000 ALTER TABLE `jset_sql` DISABLE KEYS */;
/*!40000 ALTER TABLE `jset_sql` ENABLE KEYS */;


-- Dumping structure for table jxset.jset_table
DROP TABLE IF EXISTS `jset_table`;
CREATE TABLE IF NOT EXISTS `jset_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `section` smallint(6) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `source` text,
  `target` varchar(100) DEFAULT NULL,
  `help` text,
  `validation` varchar(8000) DEFAULT NULL,
  `system` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name` (`name`,`section`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table jxset.jset_table: ~6 rows (approximately)
/*!40000 ALTER TABLE `jset_table` DISABLE KEYS */;
REPLACE INTO `jset_table` (`id`, `name`, `section`, `description`, `title`, `source`, `target`, `help`, `validation`, `system`) VALUES
	(1, 'jset_table', NULL, 'Manage grid definition', 'Tables', 'jset_table', 'jset_table', '<div>This grid let you define data objects to be used by grids in an application.</div>', NULL, 1),
	(2, 'jset_column', NULL, NULL, 'Columns', 'jset_column', 'jset_column', NULL, NULL, 1),
	(3, 'jset_help', NULL, NULL, 'Help Tips', 'v_jset_help', 'jset_column', NULL, NULL, 1),
	(4, 'jset_event', NULL, NULL, 'Events', 'jset_event', 'jset_event', 'This grid let you define events for a grid.<br />An event is a php method that can be set to run on the following situations:<br /><br />before insert<br />after insert<br />before select<br />after select<br />before update<br />after update<br />before delete<br />after delete<br /><br />', NULL, 1),
	(5, 'jset_host', NULL, NULL, 'Hosts', 'jset_host', 'jset_host', 'This grid let you define credentials for accessing projects.', NULL, 1),
	(6, 'demo', NULL, NULL, NULL, 'v_demo', 'demo', '<div>&nbsp;</div>', NULL, 0);
/*!40000 ALTER TABLE `jset_table` ENABLE KEYS */;


-- Dumping structure for table jxset.jset_upload
DROP TABLE IF EXISTS `jset_upload`;
CREATE TABLE IF NOT EXISTS `jset_upload` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) DEFAULT NULL,
  `upload_name` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `upload_name` (`upload_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table jxset.jset_upload: ~0 rows (approximately)
/*!40000 ALTER TABLE `jset_upload` DISABLE KEYS */;
/*!40000 ALTER TABLE `jset_upload` ENABLE KEYS */;


-- Dumping structure for procedure jxset.p_copy_jset_columns
DROP PROCEDURE IF EXISTS `p_copy_jset_columns`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_copy_jset_columns`(vsource varchar(45), vtarget varchar(45))
BEGIN
  declare did int;

  insert into jset_table (name, source, target) values(vtarget, vtarget, vtarget);
  set did = (select LAST_INSERT_ID());

  insert into jset_column (`parent`, `name`, `index`, `title`, `control`, `hidden`, `edithidden`, `noedit`, `list`, `rowpos`, `rowlabel`, `position`, `readonly`, `default_value`, `search_default`, `override`, `width`, `usize`, `height`, `src`)
  select did, `name`, `index`, `title`, `control`, `hidden`, `edithidden`, `noedit`, `list`, `rowpos`, `rowlabel`, `position`, `readonly`, `default_value`, `search_default`, `override`, `width`, `usize`, `height`, `src`
  from jset_column where parent = (select id from jset_table where name = vsource);

  select did as id;
END//
DELIMITER ;


-- Dumping structure for procedure jxset.p_execute
DROP PROCEDURE IF EXISTS `p_execute`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_execute`(vsql varchar(8000))
BEGIN
SET @s = vsql;
PREPARE s from @s;
EXECUTE s;
DEALLOCATE PREPARE s;

END//
DELIMITER ;


-- Dumping structure for procedure jxset.p_set_jset_semaphore
DROP PROCEDURE IF EXISTS `p_set_jset_semaphore`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_set_jset_semaphore`(vname varchar(45), vvalue tinyint)
BEGIN
declare dfalg tinyint;
declare did int;
declare dend timestamp;

select id, `stamp_end` into did, dend from jset_semaphore where `name` = vname order by id desc limit 1;

IF vvalue = 1 THEN
  if dend is not null or did is null then
    insert into jset_semaphore (`name`) values (vname);
    select 1 as result;
  else
    select 0 as result;
  end if;
ELSE
  if did is not null and dend is null then
    update jset_semaphore set `stamp_end` = now() where id = did;
    select 1 as result;
  else
    select 0 as result;
  end if;
end if;

END//
DELIMITER ;


-- Dumping structure for view jxset.v_databases
DROP VIEW IF EXISTS `v_databases`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_databases` (
	`databases` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view jxset.v_demo
DROP VIEW IF EXISTS `v_demo`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_demo` (
	`id` INT(10) UNSIGNED NOT NULL,
	`char` VARCHAR(100) NULL COLLATE 'utf8_bin',
	`text` TEXT NULL COLLATE 'utf8_general_ci',
	`date` DATE NULL,
	`image` VARCHAR(1024) NULL COLLATE 'utf8_general_ci',
	`video` VARCHAR(1024) NULL COLLATE 'utf8_general_ci',
	`integer` INT(11) NULL,
	`decimal` DECIMAL(11,2) NULL,
	`boolean` TINYINT(1) UNSIGNED NULL,
	`select` SMALLINT(6) UNSIGNED NULL,
	`multiselect` VARCHAR(1024) NULL COLLATE 'utf8_general_ci',
	`multicheckbox` VARCHAR(1024) NULL COLLATE 'utf8_general_ci',
	`link` VARCHAR(1024) NULL COLLATE 'utf8_general_ci',
	`html` MEDIUMTEXT NULL COLLATE 'utf8_general_ci',
	`residents` INT(10) UNSIGNED NOT NULL
) ENGINE=MyISAM;


-- Dumping structure for view jxset.v_jset_help
DROP VIEW IF EXISTS `v_jset_help`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_jset_help` (
	`id` INT(10) UNSIGNED NOT NULL,
	`parent` INT(10) UNSIGNED NOT NULL,
	`field` VARCHAR(45) NULL COLLATE 'utf8_general_ci',
	`help` VARCHAR(2000) NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view jxset.v_jset_table
DROP VIEW IF EXISTS `v_jset_table`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_jset_table` (
	`id` INT(10) UNSIGNED NOT NULL,
	`name` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`description` VARCHAR(200) NULL COLLATE 'utf8_general_ci',
	`title` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`source` TEXT NULL COLLATE 'utf8_general_ci',
	`target` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`help` TEXT NULL COLLATE 'utf8_general_ci',
	`columns` INT(10) UNSIGNED NOT NULL,
	`events` INT(10) UNSIGNED NOT NULL
) ENGINE=MyISAM;


-- Dumping structure for view jxset.v_jset_table_name
DROP VIEW IF EXISTS `v_jset_table_name`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_jset_table_name` (
	`id` INT(10) UNSIGNED NOT NULL,
	`name` VARCHAR(100) NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view jxset.v_list_control
DROP VIEW IF EXISTS `v_list_control`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_list_control` (
	`id` INT(10) UNSIGNED NOT NULL,
	`name` VARCHAR(45) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view jxset.v_source
DROP VIEW IF EXISTS `v_source`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_source` (
	`id` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci',
	`name` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view jxset.v_tables
DROP VIEW IF EXISTS `v_tables`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_tables` (
	`TABLE_NAME` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view jxset.v_target
DROP VIEW IF EXISTS `v_target`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_target` (
	`id` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci',
	`name` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view jxset.v_xmonth
DROP VIEW IF EXISTS `v_xmonth`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_xmonth` (
	`id` INT(10) UNSIGNED NOT NULL,
	`name` VARCHAR(45) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view jxset.v_xyear
DROP VIEW IF EXISTS `v_xyear`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_xyear` (
	`id` INT(10) UNSIGNED NOT NULL,
	`name` VARCHAR(45) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view jxset.v_databases
DROP VIEW IF EXISTS `v_databases`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_databases`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_databases` AS select `schemata`.`SCHEMA_NAME` AS `databases` from `information_schema`.`schemata` order by `schemata`.`SCHEMA_NAME` ;


-- Dumping structure for view jxset.v_demo
DROP VIEW IF EXISTS `v_demo`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_demo`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_demo` AS select *, id as residents from demo ;


-- Dumping structure for view jxset.v_jset_help
DROP VIEW IF EXISTS `v_jset_help`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_jset_help`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_jset_help` AS select `jset_column`.`id` AS `id`,`jset_column`.`parent` AS `parent`,if((`jset_column`.`title` is not null),`jset_column`.`title`,`jset_column`.`name`) AS `field`,`jset_column`.`help` AS `help` from `jset_column` where ((isnull(`jset_column`.`hidden`) and isnull(`jset_column`.`noedit`)) or `jset_column`.`edithidden`) ;


-- Dumping structure for view jxset.v_jset_table
DROP VIEW IF EXISTS `v_jset_table`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_jset_table`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_jset_table` AS select `jset_table`.`id` AS `id`,`jset_table`.`name` AS `name`,`jset_table`.`description` AS `description`,`jset_table`.`title` AS `title`,`jset_table`.`source` AS `source`,`jset_table`.`target` AS `target`,`jset_table`.`help` AS `help`,`jset_table`.`id` AS `columns`,`jset_table`.`id` AS `events` from `jset_table` ;


-- Dumping structure for view jxset.v_jset_table_name
DROP VIEW IF EXISTS `v_jset_table_name`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_jset_table_name`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_jset_table_name` AS select `jset_table`.`id` AS `id`,`jset_table`.`name` AS `name` from `jset_table` ;


-- Dumping structure for view jxset.v_list_control
DROP VIEW IF EXISTS `v_list_control`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_list_control`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_list_control` AS select tid as id, name from jset_list where `type` = 'control' ;


-- Dumping structure for view jxset.v_source
DROP VIEW IF EXISTS `v_source`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_source`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_source` AS select `tables`.`TABLE_NAME` AS `id`,`tables`.`TABLE_NAME` AS `name` from `information_schema`.`tables` where (`tables`.`TABLE_SCHEMA` = database()) ;


-- Dumping structure for view jxset.v_tables
DROP VIEW IF EXISTS `v_tables`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_tables`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_tables` AS select `tables`.`TABLE_NAME` AS `TABLE_NAME` from `information_schema`.`tables` where (`tables`.`TABLE_SCHEMA` = database()) ;


-- Dumping structure for view jxset.v_target
DROP VIEW IF EXISTS `v_target`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_target`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_target` AS select `tables`.`TABLE_NAME` AS `id`,`tables`.`TABLE_NAME` AS `name` from `information_schema`.`tables` where ((`tables`.`TABLE_SCHEMA` = database()) and (`tables`.`TABLE_TYPE` = 'BASE TABLE')) ;


-- Dumping structure for view jxset.v_xmonth
DROP VIEW IF EXISTS `v_xmonth`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_xmonth`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_xmonth` AS select `jset_list`.`tid` AS `id`,`jset_list`.`name` AS `name` from `jset_list` where (`jset_list`.`type` = _utf8'xmonth') order by `jset_list`.`tid` ;


-- Dumping structure for view jxset.v_xyear
DROP VIEW IF EXISTS `v_xyear`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_xyear`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_xyear` AS select `jset_list`.`tid` AS `id`,`jset_list`.`name` AS `name` from `jset_list` where (`jset_list`.`type` = _utf8'xyear') order by `jset_list`.`tid` ;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
