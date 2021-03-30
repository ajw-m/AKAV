# AKAV (ActualKeyboardAvoidingView)
Because https://reactnative.dev/docs/keyboardavoidingview isn't enough (we still use it though)

## The Problem:
Keyboard placement in React Native has been an inconvience for me and for many other developers. And simply follolowing the docs isn't quite ideal.

## The Solution:
A universal view where the skelenton of the page is defined, and `action buttons` are well positioned, regardless where the keyboard is.

## Usage:

```es6
import AKAV from '@ajxb/akav'

const RenderSubmitButton = () => {
	return <Button type={'primary'} title={'Login'} onPress={handleLogin}/> } offset={120} pl={10} pr={10} testID={'loginSubmitButton'}/>
}

<AKAV submitButton={<RenderSubmitButton/>}
	<MyLogo/>
	<MyEmailInputField/>
	<MyPasswordInputField/>
</AKAV/>
```

Prop | Description | Type | Default
------ | ------ | ------ | ------
**`submitButton`** | Most likely `View` container that contains the page's - Call to - action buttons | ReactNode | **Required**
**`children`** | The rest of the page's components, like forms and images | [ReactNode] | **Required**
**`background`** | The background color of the `SafeAreaView` that contains the `children` | String | #FFFFFF
**`pl`** | Padding left of the `SafeAreaView` that contains the `children` | Number | 20
**`pr`** | Padding right of the `SafeAreaView` that contains the `children` | Number | 20
**`needsSTB`** | Does the `ScrollView` need to scroll to the bottom of the page when keyboard opens? (Useful in some edge cases) | Boolean | false
**`offset`** | The `KeyboardAvoidingView` offset, (see [Documentation](https://reactnative.dev/docs/keyboardavoidingview#keyboardverticaloffset)) | Number | 100
