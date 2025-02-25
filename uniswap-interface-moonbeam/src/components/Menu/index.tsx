import React, { useRef } from 'react'
import { Code, MessageCircle, Home } from 'react-feather'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import useToggle from '../../hooks/useToggle'
import { useTranslation } from 'react-i18next'

import { ExternalLink } from '../../theme'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 8.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  text-decoration: none;
  &.${activeClassName} {
    color: ${({ theme }) => theme.text1};
    text-decoration: none;
  }

  :hover,
  :focus {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
`

export default function Menu() {
  const node = useRef<HTMLDivElement>()
  const [open, toggle] = useToggle(false)
  const { t } = useTranslation()

  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <MenuItem id="link" href="https://seascape.finance/">
            <Home size={14} />
            {t('Website')}
          </MenuItem>
          <MenuItem id="link" href="https://discord.gg/vmVGRMK">
            <MessageCircle size={14} />
            {t('discord')}
          </MenuItem>
          <MenuItem id="link" href="https://github.com/ahmetson/seadex">
            <Code size={14} />
            {t('code')}
          </MenuItem>
          <StyledNavLink id={`termsOfReference-nav-link`} to={'/termsOfReference'}>
            {t('Terms of Reference')}
          </StyledNavLink>
          <StyledNavLink id={`privacyPolicy-nav-link`} to={'/privacyPolicy'}>
            {t('Privacy Policy')}
          </StyledNavLink>
        </MenuFlyout>
      )
      }
    </StyledMenu >
  )
}
