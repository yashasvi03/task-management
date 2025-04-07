import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../styles/StyledComponents';
import { 
  FiHome, 
  FiList, 
  FiGrid, 
  FiPlus 
} from 'react-icons/fi';

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? '#4a90e2' : '#666'};
  text-decoration: none;
  font-weight: ${props => props.$active ? '500' : 'normal'};
  padding: 5px 0;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background-color: #4a90e2;
    transition: width 0.3s;
  }
  
  &:hover {
    color: #4a90e2;
    
    &:after {
      width: 100%;
    }
  }
`;

const AppHeader = styled.header`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 15px 0;
  margin-bottom: 30px;
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  
  span {
    color: #4a90e2;
  }
`;

const Header: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <AppHeader>
      <HeaderContainer>
        <Logo>
          Task<span>Manager</span>
        </Logo>
        <Nav>
          <NavLink to="/" $active={path === '/'}>
            <FiHome style={{ marginRight: '5px' }} /> Dashboard
          </NavLink>
          <NavLink to="/tasks" $active={path === '/tasks'}>
            <FiList style={{ marginRight: '5px' }} /> List View
          </NavLink>
          <NavLink to="/board" $active={path === '/board'}>
            <FiGrid style={{ marginRight: '5px' }} /> Board View
          </NavLink>
          <NavLink to="/tasks/new" $active={path === '/tasks/new'}>
            <FiPlus style={{ marginRight: '5px' }} /> New Task
          </NavLink>
        </Nav>
      </HeaderContainer>
    </AppHeader>
  );
};

export default Header;
