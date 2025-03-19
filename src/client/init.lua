RegisterNuiCallback('GET_SETTINGS', function(data, cb)


  cb({
    primaryColor = 'clean', 
    primaryShade = 9, 
    customTheme  = {
      "#f8edff",
      "#e9d9f6",
      "#d0b2e8",
      "#b588da",
      "#9e65cf",
      "#914ec8",
      "#8a43c6",
      "#7734af",
      "#692d9d",
      "#5c258b"
    },
     
    -- ADD YOUR SETTINGS HERE THEY WILL PULL WHEN THE UI INITIALIZES
  })


  --[[ -- using dirk_lib
    cb({
      primaryColor = lib.settings.primaryColor,
      primaryShade = lib.settings.primaryShade, 
      customTheme  = lib.settings.customTheme,
    })

  ]]

end)


RegisterNuiCallback('GET_LOCALES', function(data, cb)
  cb({
    my_locale = 'My Locale',
  })
  -- using dirk_lib
  -- cb(lib.getLocales())
end)

RegisterNuiCallback('GET_LUA_TABLE', function(data, cb)
  local tableName = data.tableName
  -- I put all my 'configs' within a settings folder you may want to change to config or wahtever the fuck you use
  -- Also it expects to load it like a return {}
  local table = lib.load(('settings/%s'):format(tableName))
  if not table then 
    cb('failed')
    return lib.print.info(('Table %s was requested by NUI but not found'):format(tableName))
  end 
  cb(table)
end)