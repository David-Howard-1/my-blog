import { getUser, getUsers } from '@/db/query';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  console.log('Received Post id:', id);

  if (!id) {
    const users = await getUsers();

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'No users found' }, { status: 400 });
    }

    return NextResponse.json(users);
  } else {
    const user = await getUser(Number(id));

    if (!user) {
      return NextResponse.json(
        { error: 'No user found with the provided id' },
        { status: 400 }
      );
    }

    return NextResponse.json(user);
  }
}
