### O que o usuário pode fazer

- O usuário deve ser capaz de se registrar no sistema
- O usuário deve ser capaz de se logar no sistema
- O usuário deve ser capaz de visualizar uma lista de mesas disponíveis
- O usuário deve ser capaz de reservar uma mesa
- O usuário deve ser capaz de cancelar uma reserva
- O usuário deve ser capaz de ver a lista de reservas
- O usuário deve ser capaz de atualizar a reserva de uma mesa

### O que o admin pode fazer

- O admin deve ser capaz de adicionar uma mesa
- O admin deve ser capaz de remover uma mesa
- O admin deve ser capaz de atualizar a capacidade de uma mesa

### Relacionamento das entidades

### O que o usuário pode fazer

- O usuário deve ser capaz de se registrar no sistema
- O usuário deve ser capaz de se logar no sistema
- O usuário deve ser capaz de visualizar uma lista de mesas disponíveis
- O usuário deve ser capaz de reservar uma mesa
- O usuário deve ser capaz de cancelar uma reserva
- O usuário deve ser capaz de ver a lista de reservas
- O usuário deve ser capaz de atualizar a reserva de uma mesa

### O que o admin pode fazer

- O admin deve ser capaz de adicionar uma mesa
- O admin deve ser capaz de remover uma mesa
- O admin deve ser capaz de atualizar a capacidade de uma mesa

### Relacionamento das entidades

- Usuário (1) ↔ (N) Reservas: Um usuário tem um histórico com várias reservas ao longo do tempo.
- Reserva (N) ↔ (1) Mesa: Cada reserva aponta para exatamente uma mesa.
- Mesa (1) ↔ (N) Reservas: Cada mesa tem um histórico com várias reservas ao longo do tempo.
