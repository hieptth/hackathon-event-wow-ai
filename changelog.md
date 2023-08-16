# version 1.0.1

## Navbar (navbar.hbs & navbar.scss)
- remove tickets section and the star element following
- remove tickets navbar element

## Landing section (landingPage.hbs & landing.scss)
- change **Why attend** to **Who will attend** in navbar
- change the section and intro video height to 100vh
- add an img to **extras .stats** to display bubble
- update **extras .stats** styling in scss
- remove the **Save your slot button** at page's end
- remove padding of the sub-page class in _sub_page.scss
- change **Get start** to **Secure a slot NOW** in navbar
- remove mute/un-mute button

# version 1.0.2

## Navbar (index.html & _c_navbar.js & navbar.scss)
- moved above the landingPage section
- remove `hidden` for scrollY above about section by changing display to block in **navbar.scss**
- remove the display control in **navbar.js**
- change condition for navbar bg from section1Height to 300 unit.
- add background-color for `navbar__links`

## Landing section (landingPage.hbs & landing.scss)
- remove custom navbar & use global navbar instead
- font-weight of `timer` changed from 900 to 800
- add animation in **landing.scss** to spin the bubble

## Agenda (agenda_tag.hbs & agenda.scss)
- add another layout for multi speakers
    - wrap speakers inside `desc_images` then `desc__image` like the example given

## index.html
- change the script for default openTab to speaker.


# version 1.0.3

## navbar
- remove FAQ

## html
- change scrollbar in **global.scss**
- remove padding of body
- add tik tok link to footer icon (omissible)

## landing.scss
- hot fix video overflow content (on review)

## temp_judge.hbs & judges.scss
- fix responsive problem

## agenda_tag.hbs & agenda.scss
- make `Remarks` button have `whitespace: nowrap;`
- change **divider bar** between schedule & wrapper from image to html element
- change styling here & there (font-size, font-weight, padding, etc.)

# version 1.0.4

## Requirements:
---
- [x] Change navbar background color to match body color
- [x] Add pagination to Sponsor's & Speakers-Lineup's carousel
- [x] Fix styling for `footer__text` to wrap normally
- [x] Fix class `character` wrapped mid container
- [x] Remove the star separating sections of old `Tickets`

## Changes:
- `entry.js`
- `style.css`
- `index.html`
  - Update links in `footer__text` (**must** wrap the links and text inside a `span`)
  - Removed first `footer__text` containing real world location
  - Removed `FAQ` in `c-navbar__links`
  - Remove `<section__stars entrance-animation entrance-animation--show` after `attend` section