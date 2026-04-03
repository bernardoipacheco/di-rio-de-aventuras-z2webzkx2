// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.4'
  }
  public: {
    Tables: {
      diretorio: {
        Row: {
          area_ha: number | null
          banco: string | null
          cidade: string
          created_at: string | null
          criado_por: string | null
          cultura: string | null
          data_resolucao: string | null
          estado: string
          id: string
          n_proc_comissao_especial_recursos: string | null
          nome_cliente: string
          numero_resolucao: string | null
          tipo_perda: string | null
        }
        Insert: {
          area_ha?: number | null
          banco?: string | null
          cidade: string
          created_at?: string | null
          criado_por?: string | null
          cultura?: string | null
          data_resolucao?: string | null
          estado: string
          id?: string
          n_proc_comissao_especial_recursos?: string | null
          nome_cliente: string
          numero_resolucao?: string | null
          tipo_perda?: string | null
        }
        Update: {
          area_ha?: number | null
          banco?: string | null
          cidade?: string
          created_at?: string | null
          criado_por?: string | null
          cultura?: string | null
          data_resolucao?: string | null
          estado?: string
          id?: string
          n_proc_comissao_especial_recursos?: string | null
          nome_cliente?: string
          numero_resolucao?: string | null
          tipo_perda?: string | null
        }
        Relationships: []
      }
      tarefas: {
        Row: {
          category: string | null
          created_at: string | null
          deleted_at: string | null
          description: string | null
          due_date: string | null
          id: string
          is_recurring: boolean | null
          location_url: string | null
          process_number: string | null
          recurrence_day: number | null
          status: string | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_recurring?: boolean | null
          location_url?: string | null
          process_number?: string | null
          recurrence_day?: number | null
          status?: string | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_recurring?: boolean | null
          location_url?: string | null
          process_number?: string | null
          recurrence_day?: number | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_old_trash: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: diretorio
//   id: uuid (not null, default: gen_random_uuid())
//   created_at: timestamp with time zone (nullable, default: now())
//   nome_cliente: text (not null)
//   numero_resolucao: text (nullable)
//   data_resolucao: date (nullable)
//   tipo_perda: text (nullable)
//   n_proc_comissao_especial_recursos: text (nullable)
//   banco: text (nullable)
//   area_ha: numeric (nullable)
//   cidade: text (not null)
//   estado: text (not null)
//   cultura: text (nullable)
//   criado_por: uuid (nullable)
// Table: tarefas
//   id: uuid (not null, default: gen_random_uuid())
//   created_at: timestamp with time zone (nullable, default: now())
//   title: text (not null)
//   description: text (nullable)
//   category: text (nullable)
//   status: text (nullable, default: 'pendente'::text)
//   due_date: timestamp with time zone (nullable)
//   process_number: text (nullable)
//   location_url: text (nullable)
//   is_recurring: boolean (nullable, default: false)
//   recurrence_day: integer (nullable)
//   deleted_at: timestamp with time zone (nullable)

// --- CONSTRAINTS ---
// Table: diretorio
//   FOREIGN KEY diretorio_criado_por_fkey: FOREIGN KEY (criado_por) REFERENCES auth.users(id)
//   PRIMARY KEY diretorio_pkey: PRIMARY KEY (id)
//   CHECK diretorio_tipo_perda_check: CHECK ((tipo_perda = ANY (ARRAY['Total'::text, 'Parcial'::text])))
// Table: tarefas
//   PRIMARY KEY tarefas_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: diretorio
//   Policy "Admin acesso total" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (( SELECT (users.raw_user_meta_data ->> 'role'::text)    FROM auth.users   WHERE (users.id = auth.uid())) = 'admin'::text)
//   Policy "Admin total access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'admin'::text)
//     WITH CHECK: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'admin'::text)
//   Policy "Parceiro acesso por cidade" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (cidade = ( SELECT (users.raw_user_meta_data ->> 'cidade_atribuida'::text)    FROM auth.users   WHERE (users.id = auth.uid())))

// --- DATABASE FUNCTIONS ---
// FUNCTION delete_old_trash()
//   CREATE OR REPLACE FUNCTION public.delete_old_trash()
//    RETURNS void
//    LANGUAGE plpgsql
//   AS $function$
//   BEGIN
//       DELETE FROM tarefas
//       WHERE deleted_at < NOW() - INTERVAL '15 days';
//   END;
//   $function$
//
