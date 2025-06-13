import { View, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { styled } from 'nativewind';

// Impor untuk database
import { db } from '../../src/db';
import { todos as todosSchema } from '../../src/db/schema';
import { eq, desc } from 'drizzle-orm';

// Styled Components untuk NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(TouchableOpacity);

// Nanti kita akan pindahkan ini ke /src/types
type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fungsi untuk mengambil data dari database
  const fetchTodos = async () => {
    try {
      const activeTodos = await db
        .select()
        .from(todosSchema)
        .where(eq(todosSchema.completed, false))
        .orderBy(desc(todosSchema.id)); // Tampilkan yang terbaru di atas
      setTodos(activeTodos);
    } catch (error) {
      console.error('Gagal mengambil data tugas:', error);
    }
  };

  // Gunakan useFocusEffect agar data di-refresh setiap kali layar ini aktif
  useFocusEffect(
    React.useCallback(() => {
      fetchTodos();
    }, [])
  );

  // Fungsi untuk mengubah status tugas menjadi selesai
  const handleMarkAsComplete = async (id: number) => {
    await db
      .update(todosSchema)
      .set({ completed: true })
      .where(eq(todosSchema.id, id));
    fetchTodos(); // Ambil ulang data untuk memperbarui UI
  };

  // Fungsi untuk menghapus tugas
  const handleDelete = async (id: number) => {
    await db.delete(todosSchema).where(eq(todosSchema.id, id));
    fetchTodos(); // Ambil ulang data
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <StyledView className="bg-white p-4 mx-4 my-2 rounded-lg shadow-md flex-row items-center justify-between">
      <StyledText className="text-lg flex-1 mr-2">{item.content}</StyledText>
      <StyledView className="flex-row gap-x-4">
        {/* Tombol Selesai */}
        <StyledButton onPress={() => handleMarkAsComplete(item.id)}>
          <FontAwesome name="check-circle" size={28} color="green" />
        </StyledButton>
        {/* Tombol Edit */}
        <Link href={`/edit-task/${item.id}`} asChild>
          <StyledButton>
            <FontAwesome name="pencil-square-o" size={28} color="blue" />
          </StyledButton>
        </Link>
        {/* Tombol Hapus */}
        <StyledButton onPress={() => handleDelete(item.id)}>
          <FontAwesome name="trash" size={28} color="red" />
        </StyledButton>
      </StyledView>
    </StyledView>
  );

  return (
    <StyledView className="flex-1 bg-gray-50">
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <StyledView className="flex-1 items-center justify-center mt-20">
            <StyledText className="text-xl text-gray-500">
              Belum ada tugas! 🎉
            </StyledText>
          </StyledView>
        )}
        contentContainerStyle={{ paddingBottom: 100 }} // Beri ruang untuk tombol FAB
      />

      {/* Tombol Tambah Tugas (Floating Action Button) */}
      <Link href="/add-task" asChild>
        <StyledButton className="absolute bottom-6 right-6 bg-blue-500 w-16 h-16 rounded-full items-center justify-center shadow-lg">
          <FontAwesome name="plus" size={24} color="white" />
        </StyledButton>
      </Link>
    </StyledView>
  );
}
