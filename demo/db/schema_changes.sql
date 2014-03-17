-- 2013-06-10
ALTER TABLE `jset_column`
	ADD COLUMN `aggregate` VARCHAR(200) NULL DEFAULT NULL AFTER `validation`;
	
-- 2013-07-10
-- upgrading to stringResult toolbar search
update jset_column set object = "searchoptions:{
	sopt: ['eq']
}" where control in ('intexact', 'checkbox', 'selectbox_text', 'orexact');

update jset_column set control = "int" where control = 'intexact';

update jset_column set object = "searchoptions:{
	sopt: ['cn']
}" where control in ('orlike');

-- 2013-08-11
ALTER TABLE `jset_column`
	ADD COLUMN `export` TINYINT(1) UNSIGNED NULL DEFAULT NULL AFTER `unsortable`;
	
update jset_column set export = 1;

ALTER TABLE `jset_table`
	CHANGE COLUMN `source` `source` VARCHAR(8000) NULL DEFAULT NULL AFTER `title`;
	
-- 2014-02-11
ALTER TABLE `jset_table`
	ADD COLUMN `section` SMALLINT NULL DEFAULT NULL AFTER `name`;
ALTER TABLE `jset_table`
	DROP INDEX `unique_name`,
	ADD UNIQUE INDEX `unique_name` (`name`, `section`);

-- 2014-03-04
ALTER TABLE `jset_table`
	CHANGE COLUMN `source` `source` TEXT NULL DEFAULT NULL AFTER `title`;
	
-- 2014-03-17
ALTER TABLE `jset_upload`
	ADD COLUMN `upload_name` VARCHAR(40) NULL DEFAULT NULL AFTER `name`,
	ADD UNIQUE INDEX `upload_name` (`upload_name`);
