if (Phones.find().count() === 0) {
  Phones.insert({
    name: 'User 1',
    phoneNumber: '55 5555 5555',
    title: 'Manager',
    email: 'manager@domain.com'
  });
  Phones.insert({
    name: 'User 2',
    phoneNumber: '55 5555 5555',
    title: 'peon',
    email: 'peon@domain.com'
  });
  Phones.insert({
    name: 'User 3',
    phoneNumber: '55 5555 5555',
    title: 'pleb',
    email: 'pleb@domain.com'
  });
  Phones.insert({
    name: 'User 4',
    phoneNumber: '55 5555 5555',
    title: 'Project Manager',
    email: 'project.manager@domain.com'
  });
  Phones.insert({
    name: 'User 5',
    phoneNumber: '55 5555 5555',
    title: 'Flailing Wildly',
    email: 'flailiing.wildly@domain.com'
  });
  Phones.insert({
    name: 'User 6',
    phoneNumber: '55 5555 5555',
    title: 'Document Criminal',
    email: 'document.criminal@domain.com'
  });
}
