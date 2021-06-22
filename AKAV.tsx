import React from 'react';
import {
	ScrollView,
	View,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
} from 'react-native';
import styled from 'styled-components';

const MainView = styled(SafeAreaView)`
	background: ${(props) => (props.background ? props.background : '#FFFFFF')};
	flex: 1;
`;

const Box = styled(View)`
	padding-left: ${(props) => props.pl}px;
	padding-right: ${(props) => props.pr}px;
	flex: 1;
	justify-content: flex-end;
`;

interface AKAVProps {
	children?: React.ReactNode;
	background?: string;
	pl?: number;
	pr?: number;
	needsSTB?: false | true;
	submitButton: React.ReactNode;
	offset?: number;
	scrollOffset?: number;
	testID?: string;
}

/**
 * Actual Keyboard Avoiding View
 * @param children
 * @param background
 * @param pl
 * @param pr
 * @param needsSTB
 * @param submitButton
 * @param offset
 * @param scrollOffset
 * @param testID
 * @constructor
 */
const AKAV = ({
	children,
	background = '#FFF',
	pl = 20,
	pr = 20,
	needsSTB = false,
	submitButton,
	offset = 100,
	scrollOffset = 0,
	testID = '',
}: AKAVProps) => {
	let sv = React.useRef(null);

	const _keyboardDidShow = () => {
		if (!sv || !sv.current) return;
		if (!needsSTB) return;
		sv.current.scrollToEnd();
	};

	const keyboardDidShow = () => {
		if (!scrollOffset) return;
		sv.current.scrollTo({ x: 0, y: scrollOffset, animated: true });
	};

	React.useEffect(() => {
		Keyboard.addListener('keyboardWillShow', _keyboardDidShow);
		Keyboard.addListener('keyboardDidShow', keyboardDidShow);

		// cleanup function
		return () => {
			Keyboard.removeListener('keyboardWillShow', _keyboardDidShow);
			Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
		};
	}, []);

	return (
		<KeyboardAvoidingView
			style={{
				flex: 1,
				backgroundColor: background,
			}}
			keyboardVerticalOffset={offset}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<MainView testID={testID} background={background}>
				<Box pl={pl} pr={pr}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						keyboardShouldPersistTaps={'handled'}
						ref={sv}
						style={{ height: '100%' }}
					>
						{children}
					</ScrollView>
					{submitButton}
				</Box>
			</MainView>
		</KeyboardAvoidingView>
	);
};

export { AKAV };
