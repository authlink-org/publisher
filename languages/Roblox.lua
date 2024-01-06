loadstring(game:HttpGet("https://raw.githubusercontent.com/MaHuJa/CC-scripts/master/sha256.lua"))()

local License = "a451eb67-0b3f-4be4-9c9e-39b79ada0b80a"

local ClientVersion = "v1"
local API_Endpoint = "https://auth-endpoints-production.up.railway.app/"

function a_error(msg, ...)
  return warn(("[AuthLink - %s]: %s"):format(ClientVersion, msg:format(...)))
end

local API_Version = game:HttpGet(API_Endpoint .. "version")

if(API_Version ~= ClientVersion) then
  a_error("There is a new version available (%s)", API_Version)
end

local Seed = 0
for i = 1, 10 do
  for i = 1, math.random(1, 100) do
    Seed = Seed + math.random()
  end
end
Seed = tostring(Seed)
local HashedSeed = sha256(Seed)

local Authenticate = API_Endpoint .. "authenticate?a=%s&b=%s&c=%s"

local AuthURL = Authenticate:format(
  License,
  Seed,
  "436ec4ce-bbb3-4709-9828-1d78d4373cd3"
)

local Response = game:HttpGet(AuthURL)

local CanDecode, Decoded = pcall(function()
  return game:GetService("HttpService"):JSONDecode(Response)
end)

if(not CanDecode) then
  return a_error("Unable to decode server response.")
end

if(not Decoded.success) then
  return a_error("Server responded with an unsuccessful message.")
end

if(Decoded.validator ~= HashedSeed) then
  return a_error("Server responded with invalid data.")
end

local IsPremium = not Decoded.free

warn("Authenticated")
warn("User is premium?", IsPremium)