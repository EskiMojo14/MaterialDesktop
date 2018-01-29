[Player]
Measure=Plugin
Plugin=GPMDPPlugin

[Cover]
Measure=Plugin
Plugin=GPMDPPlugin
PlayerInfo=Cover
CoverPath=#@#Cover.png
UpdateDivider=10

[Track]
Measure=Plugin
Plugin=GPMDPPlugin
PlayerInfo=Title
Substitute="":"N/A"
OnChangeAction=[!CommandMeasure MDSongGroup "[Track] | [Artist] | [Duration] | [Cover]"]

[Artist]
Measure=Plugin
Plugin=GPMDPPlugin
PlayerInfo=Artist
Substitute="":"N/A"

[Album]
Measure=Plugin
Plugin=GPMDPPlugin
PlayerInfo=Album
Substitute="":"N/A"

[Progress]
Measure=Plugin
Plugin=GPMDPPlugin
PlayerInfo=Progress
OnChangeAction=[!CommandMeasure MDProgressGroup "[Progress] | [Position]"]

[Duration]
Measure=Plugin
Plugin=GPMDPPlugin
PlayerInfo=Duration
RegExpSubstitute=1
Substitute="^00":"0","^01":"1","^02":"2","^03":"3","^04":"4","^05":"5","^06":"6","^07":"7","^08":"8","^09":"9"

[Position]
Measure=Plugin
Plugin=GPMDPPlugin
PlayerInfo=Position
RegExpSubstitute=1
Substitute="^00":"0","^01":"1","^02":"2","^03":"3","^04":"4","^05":"5","^06":"6","^07":"7","^08":"8","^09":"9"

[Volume]
Measure=Plugin
Plugin=GPMDPPlugin
PlayerInfo=Volume

[State]
Measure=Plugin
Plugin=GPMDPPlugin
PlayerInfo=State
OnChangeAction=[!CommandMeasure [MDStatus "[State]"]

[CoverAbs]
Measure=Plugin
Plugin=GPMDPPlugin
PlayerInfo=CoverWebAddress
Substitute="":"#@#images\nocover.png"
DynamicVariables=1

[Shuffle]
Measure=Plugin
Plugin=GPMDPPlugin
PlayerInfo=Shuffle

[Repeat]
Measure=Plugin
Plugin=GPMDPPlugin
PlayerInfo=Repeat