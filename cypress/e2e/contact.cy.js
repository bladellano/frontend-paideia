describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.get('[data-test="name"]').type('Caio Silva')
    cy.get('[data-test="email"]').type('bladellano@gmail.com')
    cy.get('[data-test="doubt"]').type('Lorem ipsum is simply')
    cy.get('[data-test="whatsapp"]').type('(91)98265-0277')
    cy.get('[data-test="submit"]').click()
  })
})