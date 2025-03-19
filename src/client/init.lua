RegisterNuiCallback('GET_SETTINGS', function(data, cb)
  cb({
    primaryColor = 'violet',
    primaryShade = 9,
    customTheme  = {
      "#f7ecff",
      "#e7d6fb",
      "#caaaf1",
      "#ac7ce8",
      "#9354e0",
      "#833bdb",
      "#7b2eda",
      "#6921c2",
      "#5d1cae",
      "#501599"
    },
    itemImgPath = 'nui://ox_inventory/web/images/' -- TODO: add inventory paths to the bridge... call function to get them
  })
end)


RegisterNuiCallback('GET_LOCALES', function(data, cb)
  cb({
    my_locale = 'My Locale',
  })
  -- TODO: Set this up to return the locale files locale table
  -- NOTE: This is Dirks example, he uses json, maybe I give that a shot
  -- If not successful, then I will just move my Lua files to return the locale table
end)

RegisterNuiCallback('GET_LUA_TABLE', function(data, cb)
  local tableName = data.tableName
  -- I put all my 'configs' within a settings folder you may want to change to config or wahtever the fuck you use
  -- Also it expects to load it like a return {}
  local table = lib.load(('configs/%s'):format(tableName))
  if not table then
    cb('failed')
    return lib.print.info(('Table %s was requested by NUI but not found'):format(tableName))
  end
  cb(table)
end)
