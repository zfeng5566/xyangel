import { render } from '@testing-library/react';

import DndItem from './dnd-item';

describe('DndItem', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DndItem />);
        expect(baseElement).toBeTruthy();
    });
});
