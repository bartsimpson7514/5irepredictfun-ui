import styled from "styled-components";
// #endregion Global Imports

export const TurnOffInputSpinner = styled.div`
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const StyledSwiper = styled.div`
    .swiper-wrapper {
        align-items: center !important;
        display: flex !important;
    }
    .swiper-slide {
        width: 295px !important;
    }
`;

export const EasyOptionsBanner = styled.div`
    clip-path: polygon(0 32px, 100% 32px, 100% 256px, 0 256px);

    @media (max-width: 640px) {
        clip-path: polygon(0 16px, 160px 16px, 160px 192px, 0 192px);
    }
`;

export const RewardsBlock = styled.li`
    background-image: url("/images/rewards.png");
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: 100% 0%;
`;

export const DatepickerContainer = styled.div`
    input[type="date"] {
        display: block;
        color-scheme: dark;
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
    }
`;

export const Pagination = styled.div`
    .pagination {
        margin: 15px auto;
        display: flex;
        list-style: none;
        outline: none;
    }
    .pagination > .active > a {
        background-color: #338bff;
        border-color: #47ccde;
        color: #fff;
    }
    .pagination > li > a {
        border: 1px solid #338bff;
        padding: 5px 10px;
        outline: none;
        cursor: pointer;
    }
    .pagination > .active > a,
    .pagination > .active > span,
    .pagination > .active > a:hover,
    .pagination > .active > span:hover,
    .pagination > .active > a:focus,
    .pagination > .active > span:focus {
        background-color: #338bff;
        border-color: #338bff;
        outline: none;
    }
    .pagination > li > a,
    .pagination > li > span {
        color: #338bff;
        font-size: 12px;
    }
    .pagination > li:first-child > a,
    .pagination > li:first-child > span,
    .pagination > li:last-child > a,
    .pagination > li:last-child > span {
        border-radius: unset;
    }
`;
