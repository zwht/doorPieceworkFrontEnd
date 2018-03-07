import { TicketStatePipe } from './ticket-state.pipe';

describe('TicketStatePipe', () => {
  it('create an instance', () => {
    const pipe = new TicketStatePipe();
    expect(pipe).toBeTruthy();
  });
});
