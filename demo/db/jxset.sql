-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.16 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL version:             7.0.0.4156
-- Date/time:                    2013-07-18 13:41:22
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;

-- Dumping database structure for safe_community
DROP DATABASE IF EXISTS `safe_community`;
CREATE DATABASE IF NOT EXISTS `safe_community` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `safe_community`;


-- Dumping structure for table safe_community.council
DROP TABLE IF EXISTS `council`;
CREATE TABLE IF NOT EXISTS `council` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.council: ~1 rows (approximately)
DELETE FROM `council`;
/*!40000 ALTER TABLE `council` DISABLE KEYS */;
INSERT INTO `council` (`id`, `name`, `discount`) VALUES
	(1, 'באר טוביה', 35.00);
/*!40000 ALTER TABLE `council` ENABLE KEYS */;


-- Dumping structure for table safe_community.country
DROP TABLE IF EXISTS `country`;
CREATE TABLE IF NOT EXISTS `country` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `name_en` varchar(44) DEFAULT NULL,
  `code` varchar(3) DEFAULT NULL,
  `name` varchar(71) DEFAULT NULL,
  `nazi` tinyint(2) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=244 DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.country: 243 rows
DELETE FROM `country`;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` (`id`, `name_en`, `code`, `name`, `nazi`) VALUES
	(1, 'Afghanistan', 'AF', 'אפגניסטן', NULL),
	(2, 'Aland Islands', 'AX', 'איי אולנד', NULL),
	(3, 'Albania', 'AL', 'אלבניה', NULL),
	(4, 'Algeria', 'DZ', 'אלג\'יריה', NULL),
	(5, 'American Samoa', 'AS', 'סמואה האמריקנית', NULL),
	(6, 'Andorra', 'AD', 'אנדורה', NULL),
	(7, 'Angola', 'AO', 'אנגולה', NULL),
	(8, 'Anguilla', 'AI', 'אנגווילה', NULL),
	(9, 'Antarctica', 'AQ', 'אנטארקטיקה', NULL),
	(10, 'Antigua And Barbuda', 'AG', 'אנטיגואה וברבודה', NULL),
	(11, 'Argentina', 'AR', 'ארגנטינה', NULL),
	(12, 'Armenia', 'AM', 'ארמניה', NULL),
	(13, 'Aruba', 'AW', 'ארובה', NULL),
	(14, 'Australia', 'AU', 'אוסטרליה', NULL),
	(15, 'Austria', 'AT', 'אוסטריה', NULL),
	(16, 'Azerbaijan', 'AZ', 'אזרבייג\'אן', NULL),
	(17, 'Bahamas', 'BS', 'איי בהאמה', NULL),
	(18, 'Bahrain', 'BH', 'בחריין', NULL),
	(19, 'Bangladesh', 'BD', 'בנגלדש', NULL),
	(20, 'Barbados', 'BB', 'ברבדוס', NULL),
	(21, 'Belarus', 'BY', 'בלארוס', NULL),
	(22, 'Belgium', 'BE', 'בלגיה', NULL),
	(23, 'Belize', 'BZ', 'בליז', NULL),
	(24, 'Benin', 'BJ', 'בנין', NULL),
	(25, 'Bermuda', 'BM', 'ברמודה', NULL),
	(26, 'Bhutan', 'BT', 'בהוטן', NULL),
	(27, 'Bolivia', 'BO', 'בוליביה', NULL),
	(28, 'Bosnia And Herzegovina', 'BA', 'בוסניה והרצגובינה', NULL),
	(29, 'Botswana', 'BW', 'בוצואנה', NULL),
	(30, 'Bouvet Island', 'BV', 'בווט האי', NULL),
	(31, 'Brazil', 'BR', 'ברזיל', NULL),
	(32, 'British Indian Ocean Territory', 'IO', 'טריטוריה בריטית באוקיינוס ​​ההודי', NULL),
	(33, 'Brunei Darussalam', 'BN', 'ברוני', NULL),
	(34, 'Bulgaria', 'BG', 'בולגריה', NULL),
	(35, 'Burkina Faso', 'BF', 'בורקינה פאסו', NULL),
	(36, 'Burundi', 'BI', 'בורונדי', NULL),
	(37, 'Cambodia', 'KH', 'קמבודיה', NULL),
	(38, 'Cameroon', 'CM', 'קמרון', NULL),
	(39, 'Canada', 'CA', 'קנדה', NULL),
	(40, 'Cape Verde', 'CV', 'קייפ ורדה', NULL),
	(41, 'Cayman Islands', 'KY', 'איי קיימן', NULL),
	(42, 'Central African Republic', 'CF', 'הרפובליקה של מרכז אפריקה', NULL),
	(43, 'Chad', 'TD', 'צ\'אד', NULL),
	(44, 'Chile', 'CL', 'צ\'ילה', NULL),
	(45, 'China', 'CN', 'סין', NULL),
	(46, 'Christmas Island', 'CX', 'אי חג המולד', NULL),
	(47, 'Cocos (Keeling) Islands', 'CC', 'איי קוקוס (קילינג)', NULL),
	(48, 'Colombia', 'CO', 'קולומביה', NULL),
	(49, 'Comoros', 'KM', 'קומורו', NULL),
	(50, 'Congo', 'CG', 'קונגו', NULL),
	(51, 'Congo, The Democratic Republic Of The', 'CD', 'קונגו, הרפובליקה הדמוקרטית של', NULL),
	(52, 'Cook Islands', 'CK', 'איי קוק', NULL),
	(53, 'Costa Rica', 'CR', 'קוסטה ריקה', NULL),
	(54, 'Cote D\'Ivoire', 'CI', 'חוף השנהב', NULL),
	(55, 'Croatia', 'HR', 'קרואטיה', NULL),
	(56, 'Cuba', 'CU', 'קובה', NULL),
	(57, 'Cyprus', 'CY', 'קפריסין', NULL),
	(58, 'Czech Republic', 'CZ', 'צ\'כיה', NULL),
	(59, 'Denmark', 'DK', 'דנמרק', NULL),
	(60, 'Djibouti', 'DJ', 'ג\'יבוטי', NULL),
	(61, 'Dominica', 'DM', 'דומיניקה', NULL),
	(62, 'Dominican Republic', 'DO', 'רפובליקה דומיניקנית', NULL),
	(63, 'Ecuador', 'EC', 'אקוודור', NULL),
	(64, 'Egypt', 'EG', 'מצרים', NULL),
	(65, 'El Salvador', 'SV', 'אל סלבדור', NULL),
	(66, 'Equatorial Guinea', 'GQ', 'גינאה המשוונית', NULL),
	(67, 'Eritrea', 'ER', 'אריתריאה', NULL),
	(68, 'Estonia', 'EE', 'אסטוניה', NULL),
	(69, 'Ethiopia', 'ET', 'אתיופיה', NULL),
	(70, 'Falkland Islands (Malvinas)', 'FK', 'איי פוקלנד (מלווינס)', NULL),
	(71, 'Faroe Islands', 'FO', 'איים פארו', NULL),
	(72, 'Fiji', 'FJ', 'פיג\'י', NULL),
	(73, 'Finland', 'FI', 'פינלנד', NULL),
	(74, 'France', 'FR', 'צרפת', NULL),
	(75, 'French Guiana', 'GF', 'גיאנה הצרפתית', NULL),
	(76, 'French Polynesia', 'PF', 'פולינזיה הצרפתית', NULL),
	(77, 'French Southern Territories', 'TF', 'טריטוריות דרומיות של צרפת', NULL),
	(78, 'Gabon', 'GA', 'גבון', NULL),
	(79, 'Gambia', 'GM', 'גמביה', NULL),
	(80, 'Georgia', 'GE', 'גאורגיה', NULL),
	(81, 'Germany', 'DE', 'גרמניה', NULL),
	(82, 'Ghana', 'GH', 'גאנה', NULL),
	(83, 'Gibraltar', 'GI', 'גיברלטר', NULL),
	(84, 'Greece', 'GR', 'יון', NULL),
	(85, 'Greenland', 'GL', 'גרינלנד', NULL),
	(86, 'Grenada', 'GD', 'גרנדה', NULL),
	(87, 'Guadeloupe', 'GP', 'גוואדלופ', NULL),
	(88, 'Guam', 'GU', 'גואה', NULL),
	(89, 'Guatemala', 'GT', 'גואטמלה', NULL),
	(90, 'Guernsey', ' GG', 'גרנזי', NULL),
	(91, 'Guinea', 'GN', 'גיני', NULL),
	(92, 'Guinea-Bissau', 'GW', 'גינאה ביסאו', NULL),
	(93, 'Guyana', 'GY', 'גיאנה', NULL),
	(94, 'Haiti', 'HT', 'האיטי', NULL),
	(95, 'Heard Island And Mcdonald Islands', 'HM', 'אי הרד ואיי מקדונלד', NULL),
	(96, 'Holy See (Vatican City State)', 'VA', 'הכס קדוש (מדינת הוותיקן)', NULL),
	(97, 'Honduras', 'HN', 'הונדורס', NULL),
	(98, 'Hong Kong', 'HK', 'הונג קונג', NULL),
	(99, 'Hungary', 'HU', 'הונגריה', NULL),
	(100, 'Iceland', 'IS', 'איסלנד', NULL),
	(101, 'India', 'IN', 'הודו', NULL),
	(102, 'Indonesia', 'ID', 'אינדונזיה', NULL),
	(103, 'Iran, Islamic Republic Of', 'IR', 'איראן, רפובליקה אסלאמית של', NULL),
	(104, 'Iraq', 'IQ', 'עיראק', NULL),
	(105, 'Ireland', 'IE', 'אירלנד', NULL),
	(106, 'Isle Of Man', 'IM', 'האי מאן', NULL),
	(107, 'Israel', 'IL', 'ישראל', NULL),
	(108, 'Italy', 'IT', 'איטליה', NULL),
	(109, 'Jamaica', 'JM', 'ג\'מייקה', NULL),
	(110, 'Japan', 'JP', 'יפן', NULL),
	(111, 'Jersey', 'JE', 'סריג', NULL),
	(112, 'Jordan', 'JO', 'ירדן', NULL),
	(113, 'Kazakhstan', 'KZ', 'קזחסטן', NULL),
	(114, 'Kenya', 'KE', 'קניה', NULL),
	(115, 'Kiribati', 'KI', 'קיריבטי', NULL),
	(116, 'Korea, Democratic People\'S Republic Of', 'KP', 'קוריאה, הרפובליקה הדמוקרטית העממית של', NULL),
	(117, 'Korea, Republic Of', 'KR', 'קוריאה, רפובליקה', NULL),
	(118, 'Kuwait', 'KW', 'כווית', NULL),
	(119, 'Kyrgyzstan', 'KG', 'קירגיזסטן', NULL),
	(120, 'Lao People\'S Democratic Republic', 'LA', 'העממית של לאוס רפובליקה דמוקרטית', NULL),
	(121, 'Latvia', 'LV', 'לטביה', NULL),
	(122, 'Lebanon', 'LB', 'לבנון', NULL),
	(123, 'Lesotho', 'LS', 'לסוטו', NULL),
	(124, 'Liberia', 'LR', 'ליבריה', NULL),
	(125, 'Libyan Arab Jamahiriya', 'LY', 'הלובי הערבי Jamahiriya', NULL),
	(126, 'Liechtenstein', 'LI', 'ליכטנשטיין', NULL),
	(127, 'Lithuania', 'LT', 'ליטא', NULL),
	(128, 'Luxembourg', 'LU', 'לוקסמבורג', NULL),
	(129, 'Macao', 'MO', 'מקאו', NULL),
	(130, 'Macedonia, The Former Yugoslav Republic Of', 'MK', 'מקדוניה, הרפובליקה היוגוסלבית לשעבר של', NULL),
	(131, 'Madagascar', 'MG', 'מדגסקר', NULL),
	(132, 'Malawi', 'MW', 'מלאווי', NULL),
	(133, 'Malaysia', 'MY', 'מלזיה', NULL),
	(134, 'Maldives', 'MV', 'האיים המלדיביים', NULL),
	(135, 'Mali', 'ML', 'מאלי', NULL),
	(136, 'Malta', 'MT', 'מלטה', NULL),
	(137, 'Marshall Islands', 'MH', 'איי מרשל', NULL),
	(138, 'Martinique', 'MQ', 'מרטיניק', NULL),
	(139, 'Mauritania', 'MR', 'מאוריטניה', NULL),
	(140, 'Mauritius', 'MU', 'מאוריציוס', NULL),
	(141, 'Mayotte', 'YT', 'מאיוט', NULL),
	(142, 'Mexico', 'MX', 'מקסיקו', NULL),
	(143, 'Micronesia, Federated States Of', 'FM', 'מיקרונזיה, המדינות המאוחדות של', NULL),
	(144, 'Moldova, Republic Of', 'MD', 'מולדובה, רפובליקה', NULL),
	(145, 'Monaco', 'MC', 'מונאקו', NULL),
	(146, 'Mongolia', 'MN', 'מונגוליה', NULL),
	(147, 'Montserrat', 'MS', 'מונטסראט', NULL),
	(148, 'Morocco', 'MA', 'מרוקו', NULL),
	(149, 'Mozambique', 'MZ', 'מוזמביק', NULL),
	(150, 'Myanmar', 'MM', 'מיאנמר', NULL),
	(151, 'Namibia', 'NA', 'נמיביה', NULL),
	(152, 'Nauru', 'NR', 'נאורו', NULL),
	(153, 'Nepal', 'NP', 'נפאל', NULL),
	(154, 'Netherlands', 'NL', 'הולנד', NULL),
	(155, 'Netherlands Antilles', 'AN', 'האנטילים הולנדיים', NULL),
	(156, 'New Caledonia', 'NC', 'ניו קלדוניה', NULL),
	(157, 'New Zealand', 'NZ', 'ניו זילנד', NULL),
	(158, 'Nicaragua', 'NI', 'ניקרגואה', NULL),
	(159, 'Niger', 'NE', 'ניז\'ר', NULL),
	(160, 'Nigeria', 'NG', 'ניגריה', NULL),
	(161, 'Niue', 'NU', 'ניואה', NULL),
	(162, 'Norfolk Island', 'NF', 'אי נורפולק', NULL),
	(163, 'Northern Mariana Islands', 'MP', 'איי מריאנה הצפוני', NULL),
	(164, 'Norway', 'NO', 'נורבגיה', NULL),
	(165, 'Oman', 'OM', 'עומאן', NULL),
	(166, 'Pakistan', 'PK', 'פקיסטן', NULL),
	(167, 'Palau', 'PW', 'פלאו', NULL),
	(168, 'Palestinian Territory, Occupied', 'PS', 'השטחים פלסטיני, שנכבש', NULL),
	(169, 'Panama', 'PA', 'פנמה', NULL),
	(170, 'Papua New Guinea', 'PG', 'פפואה גינאה החדשה', NULL),
	(171, 'Paraguay', 'PY', 'פרגוואי', NULL),
	(172, 'Peru', 'PE', 'פרו', NULL),
	(173, 'Philippines', 'PH', 'פיליפינים', NULL),
	(174, 'Pitcairn', 'PN', 'פיטקרן', NULL),
	(175, 'Poland', 'PL', 'פולין', NULL),
	(176, 'Portugal', 'PT', 'פורטוגל', NULL),
	(177, 'Puerto Rico', 'PR', 'פורטו ריקו', NULL),
	(178, 'Qatar', 'QA', 'קטאר', NULL),
	(179, 'Reunion', 'RE', 'פגישת מחזור', NULL),
	(180, 'Romania', 'RO', 'רומניה', NULL),
	(181, 'Russian Federation', 'RU', 'פדרציה רוסית', NULL),
	(182, 'Rwanda', 'RW', 'רואנדה', NULL),
	(183, 'Saint Helena', 'SH', 'סנט הלנה', NULL),
	(184, 'Saint Kitts And Nevis', 'KN', 'סנט קיטס ונוויס', NULL),
	(185, 'Saint Lucia', 'LC', 'סנט לוסיה', NULL),
	(186, 'Saint Pierre And Miquelon', 'PM', 'הסנאט פייר ומיקלון', NULL),
	(187, 'Saint Vincent And The Grenadines', 'VC', 'סנט וינסנט והגרנדינים', NULL),
	(188, 'Samoa', 'WS', 'סמואה', NULL),
	(189, 'San Marino', 'SM', 'סן מרינו', NULL),
	(190, 'Sao Tome And Principe', 'ST', 'סאו טומה ופרינסיפה', NULL),
	(191, 'Saudi Arabia', 'SA', 'סעודיה', NULL),
	(192, 'Senegal', 'SN', 'סנגל', NULL),
	(193, 'Serbia And Montenegro', 'CS', 'סרביה ומונטנגרו', NULL),
	(194, 'Seychelles', 'SC', 'סיישל', NULL),
	(195, 'Sierra Leone', 'SL', 'סיירה ליאונה', NULL),
	(196, 'Singapore', 'SG', 'סינגפור', NULL),
	(197, 'Slovakia', 'SK', 'סלובקיה', NULL),
	(198, 'Slovenia', 'SI', 'סלובניה', NULL),
	(199, 'Solomon Islands', 'SB', 'איים שלמה', NULL),
	(200, 'Somalia', 'SO', 'סומליה', NULL),
	(201, 'South Africa', 'ZA', 'דרום אפריקה', NULL),
	(202, 'South Georgia And The South Sandwich Islands', 'GS', 'ג\'ורג\'יה הדרומית ואיי סנדוויץ\' הדרומי', NULL),
	(203, 'Spain', 'ES', 'ספרד', NULL),
	(204, 'Sri Lanka', 'LK', 'סרי לנקה', NULL),
	(205, 'Sudan', 'SD', 'סודאן', NULL),
	(206, 'Suriname', 'SR', 'סורינאם', NULL),
	(207, 'Svalbard And Jan Mayen', 'SJ', 'סוולברד ויאן מאיין', NULL),
	(208, 'Swaziland', 'SZ', 'סווזילנד', NULL),
	(209, 'Sweden', 'SE', 'שוודיה', NULL),
	(210, 'Switzerland', 'CH', 'שוויץ', NULL),
	(211, 'Syrian Arab Republic', 'SY', 'רפובליקה ערבית סורית', NULL),
	(212, 'Taiwan, Province Of China', 'TW', 'טייוואן, פרובינציה של סין', NULL),
	(213, 'Tajikistan', 'TJ', 'טג\'יקיסטן', NULL),
	(214, 'Tanzania, United Republic Of', 'TZ', 'טנזניה, רפובליקה המאוחדת של', NULL),
	(215, 'Thailand', 'TH', 'תאילנד', NULL),
	(216, 'Timor-Leste', 'TL', 'מזרח טימור', NULL),
	(217, 'Togo', 'TG', 'טוגו', NULL),
	(218, 'Tokelau', 'TK', 'טוקלאו', NULL),
	(219, 'Tonga', 'TO', 'טונגה', NULL),
	(220, 'Trinidad And Tobago', 'TT', 'טרינידד וטובגו', NULL),
	(221, 'Tunisia', 'TN', 'תוניסיה', NULL),
	(222, 'Turkey', 'TR', 'טורקיה', NULL),
	(223, 'Turkmenistan', 'TM', 'טורקמניסטן', NULL),
	(224, 'Turks And Caicos Islands', 'TC', 'איי טורקס וקאיקוס', NULL),
	(225, 'Tuvalu', 'TV', 'טובאלו', NULL),
	(226, 'Uganda', 'UG', 'אוגנדה', NULL),
	(227, 'Ukraine', 'UA', 'אוקראינה', NULL),
	(228, 'United Arab Emirates', 'AE', 'איחוד אמירויות ערבים', NULL),
	(229, 'United Kingdom', 'GB', 'בריטניה', NULL),
	(230, 'United States', 'US', 'ארצות הברית', NULL),
	(231, 'United States Minor Outlying Islands', 'UM', 'ארצות הברית האיים מרוחקים קטנים', NULL),
	(232, 'Uruguay', 'UY', 'אורוגוואי', NULL),
	(233, 'Uzbekistan', 'UZ', 'אוזבקיסטן', NULL),
	(234, 'Vanuatu', 'VU', 'ונואטו', NULL),
	(235, 'Venezuela', 'VE', 'ונצואלה', NULL),
	(236, 'Viet Nam', 'VN', 'ויאטנם', NULL),
	(237, 'Virgin Islands, British', 'VG', 'איי בתולה, בריטי', NULL),
	(238, 'Virgin Islands, U.S.', 'VI', 'איי בתולה, ארה', 0),
	(239, 'Wallis And Futuna', 'WF', 'אליס ופוטונה', NULL),
	(240, 'Western Sahara', 'EH', 'סהרה המערבית', NULL),
	(241, 'Yemen', 'YE', 'תימן', NULL),
	(242, 'Zambia', 'ZM', 'זמביה', NULL),
	(243, 'Zimbabwe', 'ZW', 'זימבבואה', NULL);
/*!40000 ALTER TABLE `country` ENABLE KEYS */;


-- Dumping structure for table safe_community.discount
DROP TABLE IF EXISTS `discount`;
CREATE TABLE IF NOT EXISTS `discount` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `discount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.discount: ~0 rows (approximately)
DELETE FROM `discount`;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;


-- Dumping structure for function safe_community.f_date_unformat
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


-- Dumping structure for function safe_community.f_insert_jset_atom
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


-- Dumping structure for function safe_community.f_insert_jset_atom_no_uuid
DROP FUNCTION IF EXISTS `f_insert_jset_atom_no_uuid`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `f_insert_jset_atom_no_uuid`(vkind tinyint, vweb_user varchar(45), vip varchar(45)) RETURNS bigint(20)
BEGIN
  INSERT INTO jset_atom (id, stamp, user, kind, web_user, ip)
    VALUES (null, NOW(), USER(), vkind, vweb_user, vip);

  RETURN (SELECT LAST_INSERT_ID());
END//
DELIMITER ;


-- Dumping structure for function safe_community.f_numeric_only
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


-- Dumping structure for function safe_community.f_sql
DROP FUNCTION IF EXISTS `f_sql`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` FUNCTION `f_sql`() RETURNS varchar(8000) CHARSET utf8
BEGIN
return 'select * from test';

END//
DELIMITER ;


-- Dumping structure for table safe_community.house
DROP TABLE IF EXISTS `house`;
CREATE TABLE IF NOT EXISTS `house` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `family` varchar(10) DEFAULT NULL,
  `name` varchar(17) DEFAULT NULL,
  `house_number` varchar(10) DEFAULT NULL,
  `town` varchar(14) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `council` varchar(17) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `mobile` varchar(12) DEFAULT NULL,
  `comment` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.house: 3 rows
DELETE FROM `house`;
/*!40000 ALTER TABLE `house` DISABLE KEYS */;
INSERT INTO `house` (`id`, `family`, `name`, `house_number`, `town`, `zip`, `council`, `phone`, `mobile`, `comment`) VALUES
	(1, 'נחום', 'אמיר ושרה', '67 ג\'', '5', '79815', '1', '08-583398', '050-8765432', NULL),
	(2, 'אהרוני', 'משה', '2', '3', '79860', '1', '08-581966', NULL, NULL),
	(3, 'כהן', 'גאולה', '23', '2', '79820', '1', '08-588833', '050-7966582', NULL),
	(4, 'דורות', 'שאול', '1', '3', NULL, '1', '08-8765432', '050-9876543', NULL),
	(5, 'אהרוניה', 'משהיה', '2', '3', '79860', '1', '08-581966', NULL, NULL);
/*!40000 ALTER TABLE `house` ENABLE KEYS */;


-- Dumping structure for table safe_community.import_pad
DROP TABLE IF EXISTS `import_pad`;
CREATE TABLE IF NOT EXISTS `import_pad` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `a` text,
  `b` text,
  `c` text,
  `d` text,
  `e` text,
  `f` text,
  `g` text,
  `h` text,
  `i` text,
  `j` text,
  `k` text,
  `l` text,
  `m` text,
  `n` text,
  `o` text,
  `p` text,
  `q` text,
  `r` text,
  `s` text,
  `t` text,
  `u` text,
  `v` text,
  `w` text,
  `x` text,
  `y` text,
  `z` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.import_pad: ~0 rows (approximately)
DELETE FROM `import_pad`;
/*!40000 ALTER TABLE `import_pad` DISABLE KEYS */;
/*!40000 ALTER TABLE `import_pad` ENABLE KEYS */;


-- Dumping structure for table safe_community.jset_atom
DROP TABLE IF EXISTS `jset_atom`;
CREATE TABLE IF NOT EXISTS `jset_atom` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `stamp` datetime NOT NULL,
  `user` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `kind` tinyint(3) unsigned DEFAULT NULL,
  `web_user` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `ip` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23051099225194498 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=FIXED;

-- Dumping data for table safe_community.jset_atom: ~6 rows (approximately)
DELETE FROM `jset_atom`;
/*!40000 ALTER TABLE `jset_atom` DISABLE KEYS */;
INSERT INTO `jset_atom` (`id`, `stamp`, `user`, `kind`, `web_user`, `ip`) VALUES
	(22955353918406656, '2013-05-11 07:53:11', 'root@localhost', 0, NULL, '::1'),
	(22955353918406657, '2013-05-12 03:49:11', 'root@localhost', 0, NULL, '::1'),
	(22955353918406658, '2013-05-12 03:50:26', 'root@localhost', 0, NULL, '::1'),
	(22955353918406659, '2013-05-12 05:38:47', 'root@localhost', 0, NULL, '::1'),
	(23051099225194496, '2013-07-16 08:45:08', 'root@localhost', 0, NULL, '::1'),
	(23051099225194497, '2013-07-16 08:54:46', 'root@localhost', 0, NULL, '::1');
/*!40000 ALTER TABLE `jset_atom` ENABLE KEYS */;


-- Dumping structure for table safe_community.jset_column
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
) ENGINE=InnoDB AUTO_INCREMENT=603 DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.jset_column: ~99 rows (approximately)
DELETE FROM `jset_column`;
/*!40000 ALTER TABLE `jset_column` DISABLE KEYS */;
INSERT INTO `jset_column` (`id`, `parent`, `name`, `index`, `title`, `control`, `hidden`, `readonly`, `edithidden`, `noedit`, `unsortable`, `position`, `rowpos`, `rowlabel`, `default_value`, `search_default`, `width`, `usize`, `height`, `list`, `src`, `override`, `help`, `validation`, `aggregate`, `object`) VALUES
	(17, 3, 'source', NULL, 'Source', 'textarea', 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '100', '8', 'v_source', NULL, NULL, 'The data source of this record.', NULL, NULL, NULL),
	(18, 3, 'target', NULL, 'Target', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'v_target', NULL, NULL, 'The data target of this record.', NULL, NULL, NULL),
	(26, 4, 'parent', NULL, 'Parent', 'intexact', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(35, 3, 'help', 'help_table', 'Help', 'editor', 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Help about the jset_table grid as a whole. It is available by pressing the lamp button on the grid.', NULL, NULL, NULL),
	(36, 3, 'title', 'title_table', 'Title', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '40', NULL, NULL, NULL, NULL, 'The title of the grid using this record as it\'s source.', NULL, NULL, NULL),
	(37, 3, 'id', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(38, 3, 'name', NULL, 'Name', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '40', NULL, NULL, NULL, NULL, 'The name of this jset_table record.', NULL, NULL, NULL),
	(70, 3, 'description', NULL, 'Description', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '100', NULL, NULL, NULL, NULL, 'Description of this record, free text.', NULL, NULL, NULL),
	(128, 13, 'id', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(129, 13, 'parent', NULL, NULL, 'intexact', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(131, 13, 'help', NULL, 'Tip', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(138, 13, 'field', NULL, 'Field', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(165, 19, 'id', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(166, 19, 'parent', NULL, NULL, 'intexact', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(167, 19, 'before_insert', NULL, 'Before Insert', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Php method(s) to execute before inserting a record. Methods are separated by the tilda (~) character.', NULL, NULL, NULL),
	(168, 19, 'after_insert', NULL, 'After Insert', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Php method(s) to execute after inserting a record. Methods are separated by the tilda (~) character.', NULL, NULL, NULL),
	(169, 19, 'before_select', NULL, 'Before Select', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Not in use.', NULL, NULL, NULL),
	(170, 19, 'after_select', NULL, 'After Select', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Not in use yet.', NULL, NULL, NULL),
	(171, 19, 'before_update', NULL, 'Before Update', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Php method(s) to execute before updating a record. Methods are separated by the tilda (~) character.', NULL, NULL, NULL),
	(172, 19, 'after_update', NULL, 'After Update', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Php method(s) to execute after updating a record. Methods are separated by the tilda (~) character.', NULL, NULL, NULL),
	(173, 19, 'before_delete', NULL, 'Before Delete', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Php method(s) to execute before deleting record(s). Methods are separated by the tilda (~) character.', NULL, NULL, NULL),
	(174, 19, 'after_delete', NULL, 'After Delete', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Php method(s) to execute after deleting record(s). Methods are separated by the tilda (~) character.', NULL, NULL, NULL),
	(180, 4, 'id', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(181, 4, 'name', NULL, 'Name', NULL, 0, 0, 0, 0, NULL, NULL, 10, NULL, NULL, NULL, NULL, '20', NULL, NULL, NULL, NULL, 'The name of this field. That should match the name of the field in the table or view.', NULL, NULL, NULL),
	(182, 4, 'index', NULL, 'Index', NULL, 0, 0, 0, 0, NULL, NULL, 10, NULL, NULL, NULL, NULL, '20', NULL, NULL, NULL, NULL, 'When we have more than one grid on a page and a field have the same name on different grids, use this attribute to set a different id for a field.', NULL, NULL, NULL),
	(183, 4, 'title', NULL, 'Title', NULL, 0, 0, 0, 0, NULL, NULL, 10, NULL, NULL, NULL, NULL, '20', NULL, NULL, NULL, NULL, 'The title of the field.', NULL, NULL, NULL),
	(184, 4, 'control', NULL, 'Control', NULL, 0, 0, 0, 0, NULL, NULL, 20, NULL, NULL, NULL, NULL, '20', NULL, NULL, NULL, NULL, 'The gui control for this field. The full list of available controls can be found in the file jset/jquery/js/jquery.jset.components.js.', NULL, NULL, NULL),
	(185, 4, 'hidden', NULL, 'Hidden', 'checkbox', 0, 0, 0, 0, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Set to hide the field.', NULL, NULL, NULL),
	(186, 4, 'edithidden', NULL, 'Edit Hidden', 'checkbox', 0, 0, 0, 0, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'In conjunction with the hidden attribute, let an hidden filed be editable in the form.', NULL, NULL, NULL),
	(187, 4, 'noedit', NULL, 'No Edit', 'checkbox', 0, 0, 0, 0, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Set to hide the field in the form, but show the field in the grid.', NULL, NULL, NULL),
	(188, 4, 'list', NULL, 'List', 'textarea', 0, 0, 0, 0, 0, NULL, 20, NULL, NULL, NULL, NULL, '80', '4', NULL, NULL, NULL, 'For the selectbox control, specify the name of the table or view of the control items.', NULL, NULL, NULL),
	(189, 4, 'rowpos', NULL, 'Row Position', NULL, 0, 0, 0, 0, NULL, NULL, 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Specifying fields with the same rowpos will cause them to be displayed on the same row in the edit form.', NULL, NULL, NULL),
	(190, 4, 'rowlabel', NULL, 'Row Label', NULL, 0, 0, 0, 0, NULL, NULL, 40, NULL, NULL, NULL, NULL, '60', NULL, NULL, NULL, NULL, 'When using the rowpos attribute, this attribute sets the row lable.', NULL, NULL, NULL),
	(191, 4, 'position', NULL, 'Position', NULL, 0, 0, 0, 0, NULL, NULL, 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Control the order of the fields in the grid and in the form. By default fields are shown in the order of their appearance in the table/view of the source. The list is furthur ordered by the numbers in this attribute.', NULL, NULL, NULL),
	(192, 4, 'readonly', NULL, 'Read Only', 'checkbox', 0, 0, 0, 0, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Sets a field to be readonly.', NULL, NULL, NULL),
	(193, 4, 'default_value', NULL, 'Default Value', NULL, 0, 0, 0, 0, NULL, NULL, 70, NULL, NULL, NULL, NULL, '100', NULL, NULL, NULL, NULL, 'The default value for this field when creating a new record.', NULL, NULL, NULL),
	(194, 4, 'search_default', NULL, 'Default Filter', NULL, 0, 0, 0, 0, NULL, NULL, 72, NULL, NULL, NULL, NULL, '100', NULL, NULL, NULL, NULL, 'The default filter for this field.', NULL, NULL, NULL),
	(195, 4, 'override', NULL, 'Override', NULL, 0, 0, 0, 0, 0, NULL, 75, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(196, 4, 'width', NULL, 'Column Width', NULL, 0, 0, 0, 0, NULL, NULL, 60, NULL, NULL, NULL, NULL, '10', NULL, NULL, NULL, NULL, 'The width of the field in grid view. Note that the width is relative to the other fields in the grid. The default width is 80. Specifying a number greater than 80 will increase the width and vise versa.', NULL, NULL, NULL),
	(197, 4, 'usize', NULL, 'Field Width', NULL, 0, 0, 0, 0, NULL, NULL, 60, NULL, NULL, NULL, NULL, '10', NULL, NULL, NULL, NULL, 'The width of the field in the edit form.', NULL, NULL, NULL),
	(198, 4, 'height', NULL, 'Field Height', NULL, 0, 0, 0, 0, NULL, NULL, 60, NULL, NULL, NULL, NULL, '10', NULL, NULL, NULL, NULL, 'The height of this field\'s control in the form.', NULL, NULL, NULL),
	(199, 4, 'src', NULL, 'Source Url', NULL, 0, 0, 0, 0, NULL, NULL, 20, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, 'For the grid_frame control the url of the page to be shown.', NULL, NULL, NULL),
	(200, 4, 'help', NULL, 'Help', 'textarea', 0, 0, 0, 0, NULL, NULL, 90, NULL, NULL, NULL, NULL, '120', '4', NULL, NULL, NULL, 'The help text for this field. The text is shown in the edit and view forms when we mouse over the field\'s title.', NULL, NULL, NULL),
	(201, 4, 'validation', NULL, 'Validation', 'textarea', 0, 0, 0, 0, NULL, NULL, 80, NULL, NULL, NULL, NULL, '120', '4', NULL, NULL, NULL, 'Validation rules using the jquery validator plugin syntax.', NULL, NULL, NULL),
	(202, 4, 'aggregate', NULL, 'Aggregate', NULL, 0, 0, 0, 0, 0, NULL, 78, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Aggregation function to perform on the column, to be displayed on the footer row of the grid (if present).', NULL, NULL, NULL),
	(204, 20, 'active', NULL, 'Active', 'checkbox', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(206, 20, 'host', NULL, 'Host', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, 'IP address or domain of the host.', NULL, NULL, NULL),
	(207, 20, 'id', NULL, NULL, NULL, 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(208, 20, 'name', NULL, 'Name', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, 'Name of the host, free text.', NULL, NULL, NULL),
	(209, 20, 'password', NULL, 'Password', 'password', 1, 0, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, 'Database user password.', NULL, NULL, NULL),
	(210, 20, 'user', NULL, 'User', NULL, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, 'Database user name.', NULL, NULL, NULL),
	(217, 20, 'db_name', NULL, 'Database', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '50', NULL, NULL, NULL, NULL, 'Database name.', NULL, NULL, NULL),
	(218, 3, 'system', NULL, 'System', 'checkbox', 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '30', NULL, NULL, NULL, NULL, NULL, 'If this is a system table, check it.', NULL, NULL, NULL),
	(227, 24, 'id', NULL, NULL, NULL, 0, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(228, 24, 'name', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(229, 24, 'integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(230, 24, 'boolean', NULL, 'Boolean', 'checkbox', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(231, 24, 'text', NULL, NULL, 'textarea', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '50', '4', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(232, 24, 'decimal', NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'required:true', NULL, NULL),
	(233, 24, 'picture', NULL, NULL, 'upload_image', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(234, 24, 'select', NULL, NULL, 'selectbox', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'v_list_control', NULL, NULL, NULL, NULL, NULL, NULL),
	(235, 24, 'video', NULL, NULL, 'upload_video', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(236, 24, 'multiselect', NULL, NULL, 'multiselect', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'v_list_control', NULL, NULL, NULL, NULL, NULL, NULL),
	(237, 24, 'date', NULL, NULL, 'date', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(275, 4, 'unsortable', NULL, 'Unsortable', 'checkbox', 0, 0, 0, 0, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Check this field if you wish this column to not be sortable.', NULL, NULL, NULL),
	(278, 4, 'object', NULL, 'Object', 'textarea', 0, 0, 0, 0, 0, NULL, 100, NULL, NULL, NULL, NULL, '120', '4', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(279, 3, 'validation', NULL, 'Validation', 'textarea', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '100', '8', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(552, 24, 'char', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(553, 24, 'image', NULL, NULL, 'upload_file', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(554, 24, 'link', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(555, 24, 'html', NULL, NULL, 'editor', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(559, 24, 'multicheckbox', NULL, NULL, 'multicheckbox', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'v_list_control', NULL, NULL, NULL, NULL, NULL, NULL),
	(560, 30, 'id', NULL, NULL, NULL, 1, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(561, 30, 'family', NULL, 'משפחה', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(562, 30, 'name', NULL, 'שם', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(563, 30, 'council', NULL, 'מועצה', 'selectbox', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'select * from council order by name', NULL, NULL, NULL, NULL, NULL, NULL),
	(564, 30, 'town', NULL, 'ישוב', 'selectbox', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'select * from town order by name', NULL, NULL, NULL, NULL, NULL, NULL),
	(565, 30, 'house_number', NULL, 'מספר בית', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(566, 30, 'zip', NULL, 'מיקוד', NULL, 1, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(567, 30, 'phone', NULL, 'טלפון', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(568, 30, 'mobile', NULL, 'נייד', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(569, 30, 'comment', NULL, 'הערות', 'textarea', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '80', '4', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(570, 31, 'id', NULL, NULL, NULL, 1, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(571, 31, 'name', NULL, 'שם', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(572, 31, 'discount', NULL, 'הנחה', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(583, 32, 'id', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(584, 32, 'name', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(585, 32, 'discount', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(588, 33, 'id', NULL, NULL, NULL, 1, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(589, 33, 'first_name', NULL, 'שם פרטי', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(590, 33, 'surename', NULL, 'שם משפחה', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(591, 33, 'birth_date', NULL, 'תאריך לידה', 'custom_date', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(592, 33, 'id_num', NULL, 'תעודת זהות', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(593, 33, 'origin_countr', NULL, 'ארץ מוצא', 'selectbox', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'select * from country order by name', NULL, NULL, NULL, NULL, NULL, NULL),
	(594, 33, 'aliya_year', NULL, 'שנת עלייה', NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(595, 33, 'discount_nazi', NULL, 'הנחת ניצול שואה', 'checkbox', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(596, 33, 'health', NULL, 'בריאות', 'textarea', 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '60', '4', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(597, 33, 'medical_details', NULL, NULL, NULL, 1, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(598, 33, 'death_year', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `jset_column` ENABLE KEYS */;


-- Dumping structure for table safe_community.jset_default_column
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

-- Dumping data for table safe_community.jset_default_column: ~1 rows (approximately)
DELETE FROM `jset_default_column`;
/*!40000 ALTER TABLE `jset_default_column` DISABLE KEYS */;
INSERT INTO `jset_default_column` (`id`, `Type`, `Collation`, `Null`, `Key`, `Default`, `Extra`, `Privileges`, `Comment`) VALUES
	(1, 'varchar', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `jset_default_column` ENABLE KEYS */;


-- Dumping structure for table safe_community.jset_error
DROP TABLE IF EXISTS `jset_error`;
CREATE TABLE IF NOT EXISTS `jset_error` (
  `id` bigint(20) NOT NULL,
  `message` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `query` varchar(4000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `params` varchar(8000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table safe_community.jset_error: ~6 rows (approximately)
DELETE FROM `jset_error`;
/*!40000 ALTER TABLE `jset_error` DISABLE KEYS */;
INSERT INTO `jset_error` (`id`, `message`, `query`, `params`) VALUES
	(22955353918406656, 'SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'from house) a limit 1\' at line 1', 'select * from (select all from house) a limit 1', ''),
	(22955353918406657, 'SQLSTATE[42S22]: Column not found: 1054 Unknown column \'name\' in \'order clause\'', 'SELECT `first_name`,`surename`,`birth_date`,`id_num`,`origin_countr`,`aliya_year`,`discount_nazi`,`health`,`medical_details`,`death_year` FROM `people` WHERE 1=1 ORDER BY `name` asc LIMIT 0, 100', ''),
	(22955353918406658, 'SQLSTATE[42S22]: Column not found: 1054 Unknown column \'name\' in \'order clause\'', 'SELECT `first_name`,`surename`,`birth_date`,`id_num`,`origin_countr`,`aliya_year`,`discount_nazi`,`health`,`medical_details`,`death_year` FROM `people` WHERE 1=1 ORDER BY `name` asc LIMIT 0, 100', ''),
	(22955353918406659, 'SQLSTATE[23000]: Integrity constraint violation: 1048 Column \'discount\' cannot be null', 'INSERT INTO `council` (`id`,`name`,`discount`) values (?,?,?)', '[0] => \n    [1] => באר טוביה\n    [2] => '),
	(23051099225194496, 'SQLSTATE[23000]: Integrity constraint violation: 1048 Column \'discount\' cannot be null', 'INSERT INTO `town` (`id`,`name`,`council`,`discount`) values (?,?,?,?)', '[0] => \n    [1] => נאות אחווה\n    [2] => \n    [3] => '),
	(23051099225194497, 'SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'FROM (select * from town) a WHERE 1=1 ORDER BY NULL asc LIMIT 0, 100\' at line 1', 'SELECT  FROM (select * from town) a WHERE 1=1 ORDER BY NULL asc LIMIT 0, 100', '');
/*!40000 ALTER TABLE `jset_error` ENABLE KEYS */;


-- Dumping structure for table safe_community.jset_event
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Dumping data for table safe_community.jset_event: ~5 rows (approximately)
DELETE FROM `jset_event`;
/*!40000 ALTER TABLE `jset_event` DISABLE KEYS */;
INSERT INTO `jset_event` (`id`, `parent`, `before_insert`, `after_insert`, `before_select`, `after_select`, `before_update`, `after_update`, `before_delete`, `after_delete`) VALUES
	(1, 3, NULL, 'jset_columns_mysql::create_columns(id,source)~jset_event::create_event(id)', NULL, NULL, NULL, 'jset_columns_mysql::create_columns(id,source)~jset_event::create_event(id)', NULL, NULL),
	(2, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(4, 31, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(6, 32, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(12, 33, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `jset_event` ENABLE KEYS */;


-- Dumping structure for table safe_community.jset_host
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.jset_host: ~1 rows (approximately)
DELETE FROM `jset_host`;
/*!40000 ALTER TABLE `jset_host` DISABLE KEYS */;
INSERT INTO `jset_host` (`id`, `active`, `name`, `host`, `port`, `server`, `db_name`, `user`, `password`) VALUES
	(23, 1, 'jxset', 'localhost', '3306', 'mysql', 'jxset', 'root', '');
/*!40000 ALTER TABLE `jset_host` ENABLE KEYS */;


-- Dumping structure for table safe_community.jset_layout
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

-- Dumping data for table safe_community.jset_layout: ~0 rows (approximately)
DELETE FROM `jset_layout`;
/*!40000 ALTER TABLE `jset_layout` DISABLE KEYS */;
/*!40000 ALTER TABLE `jset_layout` ENABLE KEYS */;


-- Dumping structure for table safe_community.jset_list
DROP TABLE IF EXISTS `jset_list`;
CREATE TABLE IF NOT EXISTS `jset_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tid` int(10) unsigned NOT NULL DEFAULT '0',
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Index_type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.jset_list: ~38 rows (approximately)
DELETE FROM `jset_list`;
/*!40000 ALTER TABLE `jset_list` DISABLE KEYS */;
INSERT INTO `jset_list` (`id`, `tid`, `name`, `type`) VALUES
	(1, 1, 'select', 'control'),
	(2, 2, 'checkbox', 'control'),
	(3, 3, 'currency', 'control'),
	(4, 4, 'upload', 'control'),
	(5, 5, 'editor', 'control'),
	(6, 2000, '2000', 'xyear'),
	(7, 2001, '2001', 'xyear'),
	(8, 2002, '2002', 'xyear'),
	(9, 2003, '2003', 'xyear'),
	(10, 2004, '2004', 'xyear'),
	(11, 2005, '2005', 'xyear'),
	(12, 2006, '2006', 'xyear'),
	(13, 2007, '2007', 'xyear'),
	(14, 2008, '2008', 'xyear'),
	(15, 2009, '2009', 'xyear'),
	(16, 2010, '2010', 'xyear'),
	(17, 2011, '2011', 'xyear'),
	(18, 2012, '2012', 'xyear'),
	(19, 2013, '2013', 'xyear'),
	(20, 2014, '2014', 'xyear'),
	(21, 2015, '2015', 'xyear'),
	(22, 2016, '2016', 'xyear'),
	(23, 2017, '2017', 'xyear'),
	(24, 2018, '2018', 'xyear'),
	(25, 2019, '2019', 'xyear'),
	(26, 2020, '2020', 'xyear'),
	(27, 1, '1', 'xmonth'),
	(28, 2, '2', 'xmonth'),
	(29, 3, '3', 'xmonth'),
	(30, 4, '4', 'xmonth'),
	(31, 5, '5', 'xmonth'),
	(32, 6, '6', 'xmonth'),
	(33, 7, '7', 'xmonth'),
	(34, 8, '8', 'xmonth'),
	(35, 9, '9', 'xmonth'),
	(36, 10, '10', 'xmonth'),
	(37, 11, '11', 'xmonth'),
	(38, 12, '12', 'xmonth');
/*!40000 ALTER TABLE `jset_list` ENABLE KEYS */;


-- Dumping structure for table safe_community.jset_semaphore
DROP TABLE IF EXISTS `jset_semaphore`;
CREATE TABLE IF NOT EXISTS `jset_semaphore` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stamp_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stamp_end` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table safe_community.jset_semaphore: ~0 rows (approximately)
DELETE FROM `jset_semaphore`;
/*!40000 ALTER TABLE `jset_semaphore` DISABLE KEYS */;
/*!40000 ALTER TABLE `jset_semaphore` ENABLE KEYS */;


-- Dumping structure for table safe_community.jset_sql
DROP TABLE IF EXISTS `jset_sql`;
CREATE TABLE IF NOT EXISTS `jset_sql` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sql` varchar(8000) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.jset_sql: ~0 rows (approximately)
DELETE FROM `jset_sql`;
/*!40000 ALTER TABLE `jset_sql` DISABLE KEYS */;
/*!40000 ALTER TABLE `jset_sql` ENABLE KEYS */;


-- Dumping structure for table safe_community.jset_table
DROP TABLE IF EXISTS `jset_table`;
CREATE TABLE IF NOT EXISTS `jset_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `source` varchar(4000) DEFAULT NULL,
  `target` varchar(100) DEFAULT NULL,
  `help` text,
  `validation` varchar(8000) DEFAULT NULL,
  `system` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.jset_table: ~10 rows (approximately)
DELETE FROM `jset_table`;
/*!40000 ALTER TABLE `jset_table` DISABLE KEYS */;
INSERT INTO `jset_table` (`id`, `name`, `description`, `title`, `source`, `target`, `help`, `validation`, `system`) VALUES
	(3, 'jset_table', 'Manage grid definition', 'Tables', 'jset_table', 'jset_table', '<div>This grid let you define data objects to be used by grids in an application.</div>', NULL, 1),
	(4, 'jset_column', NULL, 'Columns', 'jset_column', 'jset_column', 'This grid let you define attributes for each field in a grid. Help on each attribute\'s meaning is available in edit and view modes by moving the mouse over an attribute name.', NULL, 1),
	(13, 'jset_help', NULL, 'Help Tips', 'v_jset_help', 'jset_column', NULL, NULL, 1),
	(19, 'jset_event', NULL, 'Events', 'jset_event', 'jset_event', 'This grid let you define events for a grid.<br />An event is a php method that can be set to run on the following situations:<br /><br />before insert<br />after insert<br />before select<br />after select<br />before update<br />after update<br />before delete<br />after delete<br /><br />', NULL, 1),
	(20, 'jset_host', NULL, 'Hosts', 'jset_host', 'jset_host', 'This grid let you define credentials for accessing projects.', NULL, 1),
	(24, 'demo', NULL, NULL, 'demo', 'demo', '<div>&nbsp;</div>', NULL, 0),
	(30, 'house', NULL, NULL, 'house', 'house', '<div>&nbsp;</div>', NULL, 0),
	(31, 'council', NULL, NULL, 'council', 'council', '<div>&nbsp;</div>', NULL, 0),
	(32, 'town', NULL, NULL, 'town', 'town', '<div>&nbsp;</div>', NULL, 0),
	(33, 'people', NULL, NULL, 'people', 'people', '<div>&nbsp;</div>', NULL, 0);
/*!40000 ALTER TABLE `jset_table` ENABLE KEYS */;


-- Dumping structure for table safe_community.jset_upload
DROP TABLE IF EXISTS `jset_upload`;
CREATE TABLE IF NOT EXISTS `jset_upload` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.jset_upload: ~0 rows (approximately)
DELETE FROM `jset_upload`;
/*!40000 ALTER TABLE `jset_upload` DISABLE KEYS */;
/*!40000 ALTER TABLE `jset_upload` ENABLE KEYS */;


-- Dumping structure for table safe_community.people
DROP TABLE IF EXISTS `people`;
CREATE TABLE IF NOT EXISTS `people` (
  `id` int(11) NOT NULL DEFAULT '0',
  `first_name` varchar(100) DEFAULT NULL,
  `surename` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `id_num` varchar(12) DEFAULT NULL,
  `origin_countr` mediumint(12) DEFAULT NULL,
  `aliya_year` mediumint(9) DEFAULT NULL,
  `discount_nazi` tinyint(3) DEFAULT NULL,
  `health` text,
  `medical_details` varchar(100) DEFAULT NULL,
  `death_year` mediumint(9) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.people: 3 rows
DELETE FROM `people`;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` (`id`, `first_name`, `surename`, `birth_date`, `id_num`, `origin_countr`, `aliya_year`, `discount_nazi`, `health`, `medical_details`, `death_year`) VALUES
	(1, 'אמיר', NULL, '1950-03-08', NULL, 15, 1941, 0, 'צריך סמן האם מטופל ברווחה.', NULL, NULL),
	(2, 'משה', '', '0000-00-00', '', 0, 1940, 0, '', '', 0),
	(3, 'גאולה', '', '0000-00-00', '', 0, 0, 0, '', '', 0);
/*!40000 ALTER TABLE `people` ENABLE KEYS */;


-- Dumping structure for procedure safe_community.p_copy_jset_columns
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


-- Dumping structure for procedure safe_community.p_execute
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


-- Dumping structure for procedure safe_community.p_set_jset_semaphore
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


-- Dumping structure for table safe_community.town
DROP TABLE IF EXISTS `town`;
CREATE TABLE IF NOT EXISTS `town` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.town: ~5 rows (approximately)
DELETE FROM `town`;
/*!40000 ALTER TABLE `town` DISABLE KEYS */;
INSERT INTO `town` (`id`, `name`, `discount`) VALUES
	(1, 'נאות אחווה', 20.00),
	(2, 'כפר אחים', 25.00),
	(3, 'ערוגות', 30.00),
	(4, 'תלמי יחיאל', 30.00),
	(5, 'ינון', 22.00);
/*!40000 ALTER TABLE `town` ENABLE KEYS */;


-- Dumping structure for table safe_community.unit
DROP TABLE IF EXISTS `unit`;
CREATE TABLE IF NOT EXISTS `unit` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `manager` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table safe_community.unit: ~0 rows (approximately)
DELETE FROM `unit`;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;


-- Dumping structure for view safe_community.v_databases
DROP VIEW IF EXISTS `v_databases`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_databases` (
	`databases` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view safe_community.v_jset_help
DROP VIEW IF EXISTS `v_jset_help`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_jset_help` (
	`id` INT(10) UNSIGNED NOT NULL,
	`parent` INT(10) UNSIGNED NOT NULL,
	`field` VARCHAR(45) NULL COLLATE 'utf8_general_ci',
	`help` VARCHAR(2000) NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view safe_community.v_jset_table
DROP VIEW IF EXISTS `v_jset_table`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_jset_table` (
	`id` INT(10) UNSIGNED NOT NULL,
	`name` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`description` VARCHAR(200) NULL COLLATE 'utf8_general_ci',
	`title` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`source` VARCHAR(4000) NULL COLLATE 'utf8_general_ci',
	`target` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`help` TEXT NULL COLLATE 'utf8_general_ci',
	`columns` INT(10) UNSIGNED NOT NULL,
	`events` INT(10) UNSIGNED NOT NULL
) ENGINE=MyISAM;


-- Dumping structure for view safe_community.v_jset_table_name
DROP VIEW IF EXISTS `v_jset_table_name`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_jset_table_name` (
	`id` INT(10) UNSIGNED NOT NULL,
	`name` VARCHAR(100) NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view safe_community.v_list_control
DROP VIEW IF EXISTS `v_list_control`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_list_control` (
	`id` INT(10) UNSIGNED NOT NULL,
	`name` VARCHAR(45) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view safe_community.v_source
DROP VIEW IF EXISTS `v_source`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_source` (
	`id` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci',
	`name` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view safe_community.v_tables
DROP VIEW IF EXISTS `v_tables`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_tables` (
	`TABLE_NAME` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view safe_community.v_target
DROP VIEW IF EXISTS `v_target`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_target` (
	`id` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci',
	`name` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view safe_community.v_xmonth
DROP VIEW IF EXISTS `v_xmonth`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_xmonth` (
	`id` INT(10) UNSIGNED NOT NULL,
	`name` VARCHAR(45) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view safe_community.v_xyear
DROP VIEW IF EXISTS `v_xyear`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `v_xyear` (
	`id` INT(10) UNSIGNED NOT NULL,
	`name` VARCHAR(45) NOT NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for view safe_community.v_databases
DROP VIEW IF EXISTS `v_databases`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_databases`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_databases` AS select `schemata`.`SCHEMA_NAME` AS `databases` from `information_schema`.`schemata` order by `schemata`.`SCHEMA_NAME` ;


-- Dumping structure for view safe_community.v_jset_help
DROP VIEW IF EXISTS `v_jset_help`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_jset_help`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_jset_help` AS select `jset_column`.`id` AS `id`,`jset_column`.`parent` AS `parent`,if((`jset_column`.`title` is not null),`jset_column`.`title`,`jset_column`.`name`) AS `field`,`jset_column`.`help` AS `help` from `jset_column` where ((isnull(`jset_column`.`hidden`) and isnull(`jset_column`.`noedit`)) or `jset_column`.`edithidden`) ;


-- Dumping structure for view safe_community.v_jset_table
DROP VIEW IF EXISTS `v_jset_table`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_jset_table`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_jset_table` AS select `jset_table`.`id` AS `id`,`jset_table`.`name` AS `name`,`jset_table`.`description` AS `description`,`jset_table`.`title` AS `title`,`jset_table`.`source` AS `source`,`jset_table`.`target` AS `target`,`jset_table`.`help` AS `help`,`jset_table`.`id` AS `columns`,`jset_table`.`id` AS `events` from `jset_table` ;


-- Dumping structure for view safe_community.v_jset_table_name
DROP VIEW IF EXISTS `v_jset_table_name`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_jset_table_name`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_jset_table_name` AS select `jset_table`.`id` AS `id`,`jset_table`.`name` AS `name` from `jset_table` ;


-- Dumping structure for view safe_community.v_list_control
DROP VIEW IF EXISTS `v_list_control`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_list_control`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_list_control` AS select tid as id, name from jset_list where `type` = 'control' ;


-- Dumping structure for view safe_community.v_source
DROP VIEW IF EXISTS `v_source`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_source`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_source` AS select `tables`.`TABLE_NAME` AS `id`,`tables`.`TABLE_NAME` AS `name` from `information_schema`.`tables` where (`tables`.`TABLE_SCHEMA` = database()) ;


-- Dumping structure for view safe_community.v_tables
DROP VIEW IF EXISTS `v_tables`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_tables`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_tables` AS select `tables`.`TABLE_NAME` AS `TABLE_NAME` from `information_schema`.`tables` where (`tables`.`TABLE_SCHEMA` = database()) ;


-- Dumping structure for view safe_community.v_target
DROP VIEW IF EXISTS `v_target`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_target`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_target` AS select `tables`.`TABLE_NAME` AS `id`,`tables`.`TABLE_NAME` AS `name` from `information_schema`.`tables` where ((`tables`.`TABLE_SCHEMA` = database()) and (`tables`.`TABLE_TYPE` = 'BASE TABLE')) ;


-- Dumping structure for view safe_community.v_xmonth
DROP VIEW IF EXISTS `v_xmonth`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_xmonth`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_xmonth` AS select `jset_list`.`tid` AS `id`,`jset_list`.`name` AS `name` from `jset_list` where (`jset_list`.`type` = _utf8'xmonth') order by `jset_list`.`tid` ;


-- Dumping structure for view safe_community.v_xyear
DROP VIEW IF EXISTS `v_xyear`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `v_xyear`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `v_xyear` AS select `jset_list`.`tid` AS `id`,`jset_list`.`name` AS `name` from `jset_list` where (`jset_list`.`type` = _utf8'xyear') order by `jset_list`.`tid` ;
/*!40014 SET FOREIGN_KEY_CHECKS=1 */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
