# CSS / SCSS

- Basic rules, heavily borrowing AirBnB's excellent styleguide as the base, with influence from Medium and some inspiration from the Skeleton boilerplate.

## General Formatting
- Use 2 spaces for indentation.
- Don't use ID selectors!
- Prefix JavaScript hooks with `js-` and _never_ add styling rules to them. Additionally, and this is more of a `.js` rule, but _only_ ever bind JavaScript to these `js-` classes and never classes used for styling! Also, use dash-casing, e.g. `js-open-pdp-modal`.
- Prefix utility classes with `u-` and use dash-casing, e.g. `u-pull-left`.
- Add a space before the opening `{` in a rule declaration.
- Add a space after the `:` in a property declaration.
- A closing brace `}` should always be on a new line.
- Separate each rule declaration with a blank line.
- Use `0` instead of `none`, e.g. `border: 0;`.
- Use a leading `0` where applicable, e.g. `font-size: 0.75em;`.
- Use `//` for comments (they will be removed by the .scss preprocessor), and don't add them to the end of a line.
- With multiple selectors, give each a new line e.g.:
```css
.SomeModule__title,
.SomeModule__content {
  border: 0;
}

// notice the spacing between rules
.AnotherModule {
  font-size: 0.75em;
}

.u-full-width {
  width: 100%;
  box-sizing: border-box;
}

// this is bad...
#please-dont-use-me {
  font-weight: bold; // commenting like this is bad too...
}
```

## SCSS Specifics
- Use `.scss` syntax, not `.sass`.
- The `@extend` directive is dangerous (Google it), but tl-dr; - don't use it!
- Put `@include`s _after_ all of your other standard property declarations.
- Don't nest selectors more than **one-level deep** and _only_ use nesting for pseudo-selectors, e.g.:
```scss
.SomeModule_link {
  color: $link-color;

  &:hover {
    color: $link-hover-color;
  }

  @include transition(background 0.5s ease);
}
```

## Structure (BEM)
- Use a custom variant of BEM with PascalCase for all declarations _except_ for utility classes, which should be in the format of: `u-helper-purpose`, e.g.: `u-full-width`.
```jsx
// ListingCard.jsx
function ListingCard() {
  return (
    <article class="ListingCard ListingCard--featured">

      <h1 class="ListingCard__title">Adorable 2BR in the sunny Mission</h1>

      <div class="ListingCard__content">
        <p>Vestibulum id ligula porta felis euismod semper.</p>
      </div>

    </article>
  );
}
```


### References
[AirBnB Styleguide](https://github.com/airbnb/css)

[Medium Article](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06)

[Skeleton GitHub](https://github.com/dhg/Skeleton)