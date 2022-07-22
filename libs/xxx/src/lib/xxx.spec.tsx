import { render } from '@testing-library/react';

import Xxx from './xxx';

describe('Xxx', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Xxx />);
        expect(baseElement).toBeTruthy();
    });
});
