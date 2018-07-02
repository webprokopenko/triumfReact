import React, { Component } from 'react';
import CSS from './LeftSide.css';
import Logo from '../../assets/images/icons/logo.png';

class LeftSide extends Component {
    render() {
        return (
            <div className={CSS.left_side}>
			    <div className={CSS.wrapp_logo}>
				    <a href="/">
					    <img className={CSS.logo_img} src={Logo} alt="Triumf crypto wallet" />
				    </a>
			    </div>
			<div className={CSS.left_side_infoblock}>
				<div className={CSS.left_side_infoblock_text_1}>
					Jarvis
				</div>
				<div className={CSS.left_side_infoblock_text_2}>
					$ 1 383 999, 31
				</div>
			</div>
			<div>
				<menu>
					<a href="/" className={[CSS.left_side_menu_item, CSS.left_side_menu_bg_1, CSS.left_side_menu_active].join(' ')}>
						<span className={CSS.left_side_menu_link}>Wallets</span>
					</a>
					<a href="/" className={[CSS.left_side_menu_item, CSS.left_side_menu_bg_2].join(' ')}>
						<span className={CSS.left_side_menu_link}>Demo</span>
					</a>
					<a href="/" className={[CSS.left_side_menu_item, CSS.left_side_menu_bg_3].join(' ')}>
						<span href="/" className={CSS.left_side_menu_link}>Portfolio</span>
					</a>
					<a href="/" className={[CSS.left_side_menu_item, CSS.left_side_menu_bg_4].join(' ')}>
						<span href="/" className={CSS.left_side_menu_link}>Exchange</span>
					</a>
					<a href="/" className={[CSS.left_side_menu_item, CSS.left_side_menu_bg_5].join(' ')}>
						<span href="/" className={CSS.left_side_menu_link}>Rates</span>
					</a>
					<a href="/" className={[CSS.left_side_menu_item, CSS.left_side_menu_bg_6].join(' ')}>
						<span href="/" className={CSS.left_side_menu_link}>Back Up</span>
					</a>
					<a href="/" className={[CSS.left_side_menu_item, CSS.left_side_menu_bg_7].join(' ')}>
						<span href="/" className={CSS.left_side_menu_link}>Settings</span>
					</a>
				</menu>
			</div>
		</div>
        )
    }
}

export default LeftSide;