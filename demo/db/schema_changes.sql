-- shuki 2013-06-10
ALTER TABLE `jset_column`
	ADD COLUMN `aggregate` VARCHAR(200) NULL DEFAULT NULL AFTER `validation`;
	
-- shuki 2013-07-10
-- upgrading to stringResult toolbar search
update jset_column set object = "searchoptions:{
	sopt: ['eq']
}" where control in ('intexact', 'checkbox', 'selectbox_text', 'orexact');

update jset_column set object = "searchoptions:{
	sopt: ['cn']
}" where control in ('orlike');

-- shuki 2013-08-11
ALTER TABLE `jset_column`
	ADD COLUMN `export` TINYINT(1) UNSIGNED NULL DEFAULT NULL AFTER `unsortable`;
	
update jset_column set export = 1;

ALTER TABLE `jset_table`
	CHANGE COLUMN `source` `source` VARCHAR(8000) NULL DEFAULT NULL AFTER `title`;