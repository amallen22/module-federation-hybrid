import { analyticsClient, AnalyticsClientEnum, AnalyticsEvent } from '@npm_leadtech/cv-lib-app-analytics';
import translate from 'counterpart';
import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { useNavigate } from 'react-router-dom';

import { dateStringComposer } from '../../helpers/dateFormatter';
import { Routes } from '../../internals/router';
import { Debit } from '../../models/debits';
import { ReviewUnsubscribeDialog } from '../ReviewUnubscribeDialog/ReviewUnsubscribeDialog';
import {
    CollapseContent,
    ContentTitle,
    StyledHeaderSubtitle,
    StyledHeaderTitle,
    StyledHistoryHeaderWrapper,
    StyledTable,
    StyledTableCell,
    StyledTableHeaderCell,
    StyledTableRow,
    StyledTableWrapper,
    StyledWrapperContainer,
    UnsubscribeButton,
    UnsubscribeContainer,
} from './styles';

const tableHeaderMapProps = [{ cellName: 'date' }, { cellName: 'plan' }, { cellName: 'total' }, { cellName: 'status' }];

const getTranslatedStatus = (status: string) => {
    if (!status) return;
    switch (status) {
        case 'accepted':
            return translate('Paid');
        case 'pending':
            return translate('Next payment');
        default:
            return status;
    }
};

interface TableCell {
    cellName: string;
}

interface DataTableCells {
    tableHeaderMapProps: TableCell[];
    row: Debit;
    rowIndex: number;
}

interface Props {
    debits: Debit[];
    subscriptionPlan: string;
    userLanguage: string;
    subscribedUser: boolean;
}

const SubscriptionPaymentHistory = ({ debits, subscriptionPlan, userLanguage, subscribedUser }: Props) => {
    const [collapseOpen, setCollapseOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleCollapseClick = () => {
        setCollapseOpen(!collapseOpen);
    };

    const unsubscribeUser = () => {
        setIsOpen(true);

        analyticsClient.sendAnalyticsEvent(AnalyticsEvent.ClickUnsubscribe, {}, [
            AnalyticsClientEnum.Amplitude,
            AnalyticsClientEnum.GA4,
        ]);
    };

    const renderDataTableCells = ({ tableHeaderMapProps, row, rowIndex }: DataTableCells) => {
        return tableHeaderMapProps.map((cell: TableCell) => {
            switch (cell.cellName) {
                case 'date': {
                    const date = new Date(row['dueDate']);
                    return (
                        <StyledTableCell data-qa={`debit-date-row-${rowIndex}`}>
                            {dateStringComposer({ date, userLanguage })}
                        </StyledTableCell>
                    );
                }
                case 'plan':
                    return (
                        <StyledTableCell data-row='plan' data-qa={`debit-plan-row-${rowIndex}`}>
                            {subscriptionPlan}
                        </StyledTableCell>
                    );
                case 'total':
                    return (
                        <StyledTableCell data-qa={`debit-total-row-${rowIndex}`}>
                            {`${row['amount']} ${row['currency']}`}
                        </StyledTableCell>
                    );
                case 'status':
                    return (
                        <StyledTableCell data-qa={`debit-status-row-${rowIndex}`}>
                            {getTranslatedStatus(row['status'])}
                        </StyledTableCell>
                    );
                default:
                    break;
            }
            return <StyledTableCell key={Math.random()} />;
        });
    };

    const renderPaymentHistoryTable = (debits: Debit[]) => {
        const dataTableInfo = debits.map((row, rowIndex) => (
            <StyledTableRow className={'' + (row.status === 'pending' && 'future-payment')} key={Math.random()}>
                {renderDataTableCells({ tableHeaderMapProps, row, rowIndex })}
            </StyledTableRow>
        ));

        return (
            <StyledTableWrapper>
                <StyledTable>
                    <StyledTableRow>
                        <StyledTableHeaderCell>{translate('Date')}</StyledTableHeaderCell>
                        <StyledTableHeaderCell data-row='plan'>{translate('Plan')}</StyledTableHeaderCell>
                        <StyledTableHeaderCell>{translate('Total')}</StyledTableHeaderCell>
                        <StyledTableHeaderCell>{translate('Status')}</StyledTableHeaderCell>
                    </StyledTableRow>
                    {dataTableInfo}
                </StyledTable>
            </StyledTableWrapper>
        );
    };

    const renderUnsubscribe = () => {
        if (subscribedUser) {
            return (
                <UnsubscribeContainer>
                    <ContentTitle>{translate('Cancel Premium membership')}</ContentTitle>
                    <UnsubscribeButton data-qa='unsubscribe-link' onClick={() => unsubscribeUser()}>
                        {translate('Do you want to cancel your Premium account?')}
                    </UnsubscribeButton>
                </UnsubscribeContainer>
            );
        }

        return null;
    };

    return (
        <StyledWrapperContainer>
            <StyledHistoryHeaderWrapper collapseOpen={collapseOpen}>
                <StyledHeaderTitle
                    data-qa='collapse-subscription-data'
                    onClick={handleCollapseClick}
                    collapseOpen={collapseOpen}
                >
                    {translate('Manage my account')}
                </StyledHeaderTitle>
            </StyledHistoryHeaderWrapper>
            <Collapse isOpened={collapseOpen}>
                <CollapseContent>
                    <ContentTitle>{translate('Payment History')}</ContentTitle>
                    <StyledHeaderSubtitle data-qa={'payment-history-subtitle'}>
                        {translate(
                            'Here you can review your payments after your initial Trial Fee of %(trialFeeSubscription)s',
                            {
                                trialFeeSubscription: `${debits[0].amount} ${debits[0].currency}`,
                            },
                        )}
                    </StyledHeaderSubtitle>
                    {renderPaymentHistoryTable(debits)}
                    {renderUnsubscribe()}
                </CollapseContent>
            </Collapse>
            <ReviewUnsubscribeDialog
                open={isOpen}
                closeModal={() => setIsOpen(false)}
                onConfirmHandle={() => navigate(Routes.feedback)}
            />
        </StyledWrapperContainer>
    );
};

export { SubscriptionPaymentHistory };
