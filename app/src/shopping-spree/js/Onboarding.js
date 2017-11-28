/* eslint-disable */

import React from "react";
import request from "superagent";
import _ from 'lodash';

import FirebaseComponent from "./FirebaseComponent";

export default class Onboarding extends FirebaseComponent {
  constructor(props) {
    super(props);
    this.join = this.join.bind(this);
  }

  join(event) {
    event.preventDefault();
    let context = this;

    this.connectToFirebase();

    let shoppingSpreeId = this.props.shoppingSpreeId;
    if (shoppingSpreeId == null) {
      shoppingSpreeId = this.createNewShoppingSpree();
    } else {
      this.firebaseNodeId = shoppingSpreeId;
    }

    let icon = Math.floor(Math.random() * 20);
    this.createJoinedMessage(this.nameInput.value, this.emailInput.value, icon);

    context.props.doneOnboarding(
      this.emailInput.value,
      this.nameInput.value,
      icon,
      shoppingSpreeId,
    );
  }

  render() {
    return (
      <div
        id="shopping-spree-modal"
        className="shopping-spree shopping-spree-onboarding modal modal animated bounceIn"
        role="dialog"
        aria-hidden="true"
      >
        <div id="shopping-spree-modal-content" className="container">
          <a className="btn-close med" alt="Close" onClick={this.props.close} />
          <div id="top-headline" className="welcome-headline row">
            <div className="col-xs-12 text-center">You’re in.</div>
          </div>
          <div id="bottom-headline" className="welcome-headline row">
            <div className="col-xs-12 text-center">
              Welcome to Clique to Buy Beta.
            </div>
          </div>
          <div id="dress-one" className="row equal">
            <div
              id="dress-image-one"
              className="col-md-4 col-md-pull-0 col-xs-8 col-xs-pull-2 dress-image-left"
            >
              <img src="/images/shopping_spree/dresses/Dress1.jpg" alt="" />
            </div>
            <div className="col-md-4 col-md-pull-0 col-xs-4 col-xs-pull-4">
              <div className="row dress-one-text">
                <div className="body-text col-md-12 text-center vertical-align">
                  Here’s the deal: You and your friends shop together. The more
                  you add to your collective cart, the more you save.
                </div>
              </div>
              <div className="row dress-one-text-two desktop">
                <div className="body-text col-md-12 text-center">
                  It’s easy.
                </div>
              </div>
              <div className="row">
                <div className="body-text col-md-12 text-center">
                  Just invite your friends to shop with you, give each other
                  feedback and suggestions...
                </div>
              </div>
            </div>
          </div>

          <div id="dress-two" className="row equal">
            <div className="col-md-4 col-md-push-4 col-xs-4 col-xs-push-2 text-center vertical-align">
              <div className="body-text mobile">
                It’s easy. Just invite your friends to shop with you, give each
                other feedback and suggestions...
              </div>
              <div className="body-text desktop">
                ...and save up to 25% when you check out.
              </div>
            </div>
            <div
              id="dress-two-image"
              className="col-md-push-4 col-md-4 col-xs-8 col-xs-push-2  dress-image-right"
            >
              <img src="/images/shopping_spree/dresses/Dress2.jpg" alt="" />
            </div>
          </div>

          <div id="dress-three" className="row equal">
            <div className="col-md-4 col-md-pull-0 col-xs-8 col-xs-pull-2 dress-image-left">
              <img src="/images/shopping_spree/dresses/Dress3.jpg" alt="" />
            </div>
            <div className="col-md-4 col-md-pull-0 col-xs-4 col-xs-pull-3 vertical-align">
              <div className="body-text text-center mobile">
                ...and save up to 25% when you check out.
              </div>
              <div className="row">
                <div className="body-text text-center col-md-12 desktop">
                  Save money just by swapping shopping advice with your
                  girlfriends and buying together? Which you pretty much do
                  anyway? Believe it.
                </div>
                <div className="body-text col-md-12 text-center desktop dress-three-percent-text" />
              </div>
            </div>
          </div>

          <div id="mobile-text" className="row mobile">
            <div className="body-text text-center col-md-12">
              Save money just by swapping shopping advice with your girlfriends
              and buying together? Which you pretty much do anyway? Believe it.
            </div>
            <div className="col-md-12">
              <div className="body-text text-center dress-three-percent-text" />
            </div>
          </div>

          <div className="shspree-signup-section">
            <form onSubmit={this.join}>
              <div id="enter-email-text" className="row">
                <div className="base-text text-center col-xs-8 col-xs-push-2">
                  Enter your name and email to start saving.
                </div>
              </div>

              <div className="row top-padding-sm bottom-padding-sm">
                <div className="col-xs-10 col-md-4 float-none margin--center">
                  <input
                    className="form-control input-lg"
                    type="text"
                    placeholder="Enter your name"
                    required
                    ref={input => {
                      this.nameInput = input;
                    }}
                  />
                </div>
              </div>

              <div className="row bottom-padding-sm">
                <div className="col-xs-10 col-md-4 float-none margin--center">
                  <input
                    className="form-control input-lg"
                    type="email"
                    placeholder="Enter your email"
                    required
                    ref={input => {
                      this.emailInput = input;
                    }}
                  />
                </div>
              </div>

              <div className="row bottom-padding-lg">
                <div className="col-xs-10 col-md-4 float-none margin--center text-center">
                  <button
                    type="submit"
                    role="button"
                    className="btn btn-lrg btn-black btn-block"
                  >
                    Start Clique
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
