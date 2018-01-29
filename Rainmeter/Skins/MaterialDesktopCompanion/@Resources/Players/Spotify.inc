[Player]
Measure=Plugin
Plugin=NowPlaying
PlayerName=Spotify
PlayerType=State

[Cover]
Measure=Plugin
Plugin=SpotifyPlugin
Type=AlbumArt
Res=640
CoverPath=#@#CoverSpotify.png

[Track]
Measure=Plugin
Plugin=SpotifyPlugin
Type=TrackName
Substitute="":"N/A","^0$":"N/A"
RegExpSubstitute=1
OnChangeAction=[!CommandMeasure MDSongGroup "[Track] | [Artist] | [Duration] | [Cover]"]

[Artist]
Measure=Plugin
Plugin=SpotifyPlugin
Type=ArtistName
Substitute="":"N/A","^0$":"N/A"
RegExpSubstitute=1

[Album]
Measure=Plugin
Plugin=SpotifyPlugin
Type=AlbumName
Substitute="":"N/A","^0$":"N/A"
RegExpSubstitute=1

[Progress]
Measure=Plugin
Plugin=SpotifyPlugin
Type=Progress
Decimals=2
Substitute="nan":"0"
OnChangeAction=[!CommandMeasure MDProgressGroup "[Progress] | [Position]"]

[Duration]
Measure=Plugin
Plugin=SpotifyPlugin
Type=Length
RegExpSubstitute=1
Substitute="^00":"0","^01":"1","^02":"2","^03":"3","^04":"4","^05":"5","^06":"6","^07":"7","^08":"8","^09":"9"

[Position]
Measure=Plugin
Plugin=SpotifyPlugin
Type=Position
RegExpSubstitute=1
Substitute="^00":"0","^01":"1","^02":"2","^03":"3","^04":"4","^05":"5","^06":"6","^07":"7","^08":"8","^09":"9"

[Volume]
Measure=Plugin
Plugin=SpotifyPlugin
Type=Volume
Substitute="nan":"0"

[State]
Measure=Plugin
Plugin=SpotifyPlugin
Type=Playing
OnChangeAction=[!CommandMeasure [MDStatus "[State]"]

[CoverAbs]
Measure=Plugin
Plugin=SpotifyPlugin
Type=CoverPath
DynamicVariables=1
UpdateDivider=50
Substitute="":"#@#images\nocover.png"

[Shuffle]
Measure=Plugin
Plugin=SpotifyPlugin
Type=Shuffle

[Repeat]
Measure=Plugin
Plugin=SpotifyPlugin
Type=Repeat