exampleMessage = function(text)
  SendNuiMessage(json.encode({
    action = 'EXAMPLE_MESSAGE',
    data   = text,
  }))
end


RegisterCommand('boilerplateUpdate', function(src, args)
  exampleMessage(args[1] or 'Updated')
end)