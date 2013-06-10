-- shuki 2013-06-10
ALTER TABLE `jset_column`
	ADD COLUMN `aggregate` VARCHAR(200) NULL DEFAULT NULL AFTER `validation`;