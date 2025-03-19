 
fx_version 'cerulean' 
game 'gta5'
lua54 'yes'  

name 'r_notify'
description 'A simple notification system for FiveM'
author 'r_scripts'
version '1.0.0'

client_script { 
  'src/client/ui.lua', 
} 
 
ui_page 'web/build/index.html'

files {
	'web/build/index.html',
	'web/build/**/*',
}

escrow_ignore {
    'install/**/*.*',
    'locales/*.*',
    'configs/*.lua'
}