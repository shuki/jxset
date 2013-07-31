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