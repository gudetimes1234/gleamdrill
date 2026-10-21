//// The frame every page with a nav bar shares: notices, then a header with
//// the page's title and the nav, then the page's own body.

import gleamdrill/model.{type Route}
import gleamdrill/msg.{type Msg}
import gleamdrill/shared.{type Shared}
import gleamdrill/ui/document.{type Document}
import gleamdrill/view/banner
import gleamdrill/view/nav
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

pub fn view(shared: Shared, route: Route, page: Document(Msg)) -> Element(Msg) {
  html.div([attribute.class(page.class)], [
    case page.storage_warning {
      True -> banner.storage_warning(shared)
      False -> element.none()
    },
    nav.notices(shared),
    html.header([attribute.class("study-header")], [
      html.h1([attribute.class("study-title")], page.title),
      nav.bar(shared, route),
    ]),
    ..page.body
  ])
}
