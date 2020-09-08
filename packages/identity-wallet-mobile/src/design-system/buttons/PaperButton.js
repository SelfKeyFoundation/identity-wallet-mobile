/* @flow */

import * as React from 'react';
import { ActivityIndicator, Animated, View, StyleSheet } from 'react-native';
import color from 'color';
import Icon from 'react-native-paper/src/components/Icon';
import Surface from 'react-native-paper/src/components/Surface';
import Text from 'react-native-paper/src/components/Typography/Text';
import TouchableRipple from 'react-native-paper/src/components/TouchableRipple';
import { black, white } from 'react-native-paper/src/styles/colors';
import { withTheme } from 'react-native-paper/src/core/theming';
import type { IconSource } from 'react-native-paper/src/components/Icon';
import type { Theme } from 'react-native-paper/src/types';

type Props = React.ElementConfig<typeof Surface> & {|
  /**
   * Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.
   * - `text` - flat button without background or outline (low emphasis)
   * - `outlined` - button with an outline (medium emphasis)
   * - `contained` - button with a background color and elevation shadow (high emphasis)
   */
  mode?: 'text' | 'outlined' | 'contained',
  /**
   * Whether the color is a dark color. A dark button will render light text and vice-versa. Only applicable for `contained` mode.
   */
  dark?: boolean,
  /**
   * Use a compact look, useful for `text` buttons in a row.
   */
  compact?: boolean,
  /**
   * Custom text color for flat button, or background color for contained button.
   */
  color?: string,
  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean,
  /**
   * Icon to display for the `Button`.
   */
  icon?: IconSource,
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean,
  /**
   * Label text of the button.
   */
  children: React.Node,
  /**
   * Make the label text uppercased. Note that this won't work if you pass React elements as children.
   */
  uppercase: boolean,
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string,
  /**
   * Function to execute on press.
   */
  onPress?: () => mixed,
  /**
   * Style of button's inner content.
   * Use this prop to apply custom height and width.
   */
  contentStyle?: any,
  style?: any,
  /**
   * @optional
   */
  theme: Theme,
|};

type State = {
  elevation: Animated.Value,
};

/**
 * A button is component that the user can press to trigger an action.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/button-1.png" />
 *     <figcaption>Text button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/button-2.png" />
 *     <figcaption>Outlined button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/button-3.png" />
 *     <figcaption>Contained button</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Button icon="add-a-photo" mode="contained" onPress={() => console.log('Pressed')}>
 *     Press me
 *   </Button>
 * );
 *
 * export default MyComponent;
 * ```
 */
class Button extends React.Component<Props, State> {
  static defaultProps = {
    mode: 'text',
    uppercase: true,
  };

  state = {
    elevation: new Animated.Value(this.props.mode === 'contained' ? 2 : 0),
  };

  _handlePressIn = () => {
    if (this.props.mode === 'contained') {
      Animated.timing(this.state.elevation, {
        toValue: 8,
        duration: 200,
      }).start();
    }
  };

  _handlePressOut = () => {
    if (this.props.mode === 'contained') {
      Animated.timing(this.state.elevation, {
        toValue: 2,
        duration: 150,
      }).start();
    }
  };

  render() {
    const {
      disabled,
      compact,
      mode,
      dark,
      loading,
      icon,
      color: buttonColor,
      children,
      uppercase,
      accessibilityLabel,
      onPress,
      style,
      theme,
      contentStyle,
      ...rest
    } = this.props;
    const { colors, roundness } = theme;
    const fontFamily = theme.fonts.medium;

    let backgroundColor, borderColor, textColor, borderWidth;

    if (mode === 'contained') {
      if (disabled) {
        backgroundColor = color(theme.dark ? white : black)
          .alpha(0.12)
          .rgb()
          .string();
      } else if (buttonColor) {
        backgroundColor = buttonColor;
      } else {
        backgroundColor = colors.primary;
      }
    } else {
      backgroundColor = 'transparent';
    }

    if (mode === 'outlined') {
      borderColor = color(theme.dark ? white : black)
        .alpha(0.29)
        .rgb()
        .string();
      borderWidth = StyleSheet.hairlineWidth;
    } else {
      borderColor = 'transparent';
      borderWidth = 0;
    }

    if (disabled) {
      textColor = color(theme.dark ? white : black)
        .alpha(0.32)
        .rgb()
        .string();
    } else if (mode === 'contained') {
      let isDark;

      if (typeof dark === 'boolean') {
        isDark = dark;
      } else {
        isDark =
          backgroundColor === 'transparent'
            ? false
            : !color(backgroundColor).light();
      }

      textColor = isDark ? white : black;
    } else if (buttonColor) {
      textColor = buttonColor;
    } else {
      textColor = colors.primary;
    }

    const rippleColor = color(textColor)
      .alpha(0.32)
      .rgb()
      .string();
    const buttonStyle = {
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius: roundness,
    };
    const touchableStyle = { borderRadius: roundness };
    const textStyle = { color: textColor, fontFamily };
    const elevation =
      disabled || mode !== 'contained' ? 0 : this.state.elevation;

    return (
      <Surface
        {...rest}
        style={[
          styles.button,
          compact && styles.compact,
          { elevation },
          buttonStyle,
          style,
        ]}
      >
        <TouchableRipple
          borderless
          delayPressIn={0}
          onPress={!loading && onPress}
          onPressIn={this._handlePressIn}
          onPressOut={this._handlePressOut}
          accessibilityLabel={accessibilityLabel}
          accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
          accessibilityComponentType="button"
          accessibilityRole="button"
          accessibilityStates={disabled ? ['disabled'] : undefined}
          disabled={disabled}
          rippleColor={rippleColor}
          style={touchableStyle}
        >
          <View style={[styles.content, contentStyle]}>
            {icon && loading !== true ? (
              <View style={styles.icon}>
                {icon}
              </View>
            ) : null}
            {loading ? (
              <ActivityIndicator
                size="small"
                color={mode === 'outlined' ? theme.colors.primary : '#1E262E'}
              />
            ) : null}
            { !loading && <Text
              numberOfLines={1}
              style={[
                styles.label,
                compact && styles.compactLabel,
                textStyle,
                !icon && {
                  marginHorizontal: 16,  
                },
                { fontFamily },
              ]}
            >
              {React.Children.map(
                children,
                child =>
                  typeof child === 'string' && uppercase
                    ? child.toUpperCase()
                    : child
              )}
            </Text>}
          </View>
        </TouchableRipple>
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    minWidth: 64,
    borderStyle: 'solid',
  },
  compact: {
    minWidth: 'auto',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 15,
  },
  label: {
    textAlign: 'center',
    letterSpacing: 0,
    marginVertical: 9,
    marginHorizontal: 0,
  },
  compactLabel: {
    marginHorizontal: 8,
  },
});

export default withTheme(Button);
