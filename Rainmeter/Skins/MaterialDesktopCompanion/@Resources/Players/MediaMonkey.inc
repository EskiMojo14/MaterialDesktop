[Player]
Measure=Plugin
Plugin=NowPlaying
PlayerName=MediaMonkey
PlayerType=State

[Cover]
Measure=Plugin
Plugin=NowPlaying
PlayerName=[Player]
PlayerType=Cover
UpdateDivider=10

[Track]
Measure=Plugin
Plugin=NowPlaying
PlayerName=[Player]
PlayerType=TITLE
Substitute="":"N/A"
OnChangeAction=[!CommandMeasure MDSongGroup "[Track] | [Artist] | [Duration] | [Cover]"]

[Artist]
Measure=Plugin
Plugin=NowPlaying
PlayerName=[Player]
PlayerType=ARTIST
Substitute="":"N/A"

[Album]
Measure=Plugin
Plugin=NowPlaying
PlayerName=[Player]
PlayerType=ALBUM
Substitute="":"N/A"

[Progress]
Measure=Plugin
Plugin=NowPlaying
PlayerName=[Player]
PlayerType=Progress
OnChangeAction=[!CommandMeasure MDProgressGroup "[Progress] | [Position]"]

[Duration]
Measure=Plugin
Plugin=NowPlaying
PlayerName=[Player]
PlayerType=Duration
RegExpSubstitute=1
Substitute="^00":"0","^01":"1","^02":"2","^03":"3","^04":"4","^05":"5","^06":"6","^07":"7","^08":"8","^09":"9"

[Position]
Measure=Plugin
Plugin=NowPlaying
PlayerName=[Player]
PlayerType=Position
RegExpSubstitute=1
Substitute="^00":"0","^01":"1","^02":"2","^03":"3","^04":"4","^05":"5","^06":"6","^07":"7","^08":"8","^09":"9"

[Volume]
Measure=Plugin
Plugin=NowPlaying
PlayerName=[Player]
PlayerType=Volume

[State]
Measure=Plugin
Plugin=NowPlaying
PlayerName=[Player]
PlayerType=State
OnChangeAction=[!CommandMeasure MDStatus "[State]"]

[CoverAbs]
Measure=Plugin
Plugin=NowPlaying
PlayerName=[Player]
PlayerType=Cover
Substitute="":"#@#images\nocover.png"
UpdateDivider=50

[Shuffle]
Measure=Plugin
Plugin=NowPlaying
PlayerName=[Player]
PlayerType=Shuffle

[Repeat]
Measure=Plugin
Plugin=NowPlaying
PlayerName=[Player]
PlayerType=Repeat